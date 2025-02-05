<script lang="ts">
  import { Card, Char, Modal, Switch } from "@gzlab/uui/index";
  import Button from "@gzlab/uui/input/Button.svelte";
  import DropDown from "@gzlab/uui/input/DropDown.svelte";
  import DropDownItem from "@gzlab/uui/input/DropDownItem.svelte";
  import { derived, writable } from "svelte/store";
  import * as XLSX from "xlsx";

  import { MCQ, OQ } from "@lv00/tao-parser/web";

  export let state = false;
  let advanced = false;

  type Columns = {
    name: string;
    competency: string;
    dimension: string;
    indicator: string;
    question: string;
    correct: string;
    skip: number;
  };

  const workbook = writable<XLSX.WorkBook>();
  const fileList = writable<FileList | undefined>();

  type Template = "BOSA" | "FIN" | "OTHER";
  const template = writable<Template>("BOSA");

  type Type = "MCQ" | "OQ";
  const type = writable<Type>("MCQ");

  type Sheet = { name: string; selected: boolean };
  const sheets = writable<Sheet[]>([]);

  const defaultColumns = new Map<Template, { OQ: Columns; MCQ: Columns }>();

  const columns = writable<Columns>(defaultColumns.get("BOSA")?.MCQ);

  sheets.subscribe((s) => {
    const data = s
      .filter((sheet) => sheet.selected)
      .map((sheet) => {
        const ws = $workbook.Sheets[sheet.name];
        let questions: MCQ[] | OQ[] = [];
        try {
          if ($type === "OQ") {
            questions = OQ.fromSHeet(
              ws,
              { ...$columns },
              { skip: $columns.skip },
            );
          } else {
            questions = MCQ.fromSHeet(
              ws,
              { ...$columns },
              { skip: $columns.skip, alternative: 4 },
            );
          }
        } catch (e) {
          console.error(e);
        }
        return questions;
      });
    console.log(data);
  });

  defaultColumns.set("BOSA", {
    MCQ: {
      competency: "C",
      dimension: "D",
      indicator: "E",
      name: "F",
      question: "H",
      correct: "I",
      skip: 16,
    },
    OQ: {
      competency: "C",
      dimension: "D",
      indicator: "E",
      name: "F",
      question: "H",
      correct: "I",
      skip: 16,
    },
  });

  defaultColumns.set("FIN", {
    MCQ: {
      competency: "A",
      dimension: "B",
      indicator: "C",
      name: "D",
      question: "F",
      correct: "G",
      skip: 7,
    },
    OQ: {
      competency: "A",
      dimension: "B",
      indicator: "C",
      name: "D",
      question: "F",
      correct: "G",
      skip: 16,
    },
  });

  derived([template, type], ([$template, $type]) => [
    $template,
    $type,
  ]).subscribe(() => {
    const column = defaultColumns.get($template);
    if (!column) return;
    columns.update(() => column[$type]);
  });

  fileList.subscribe(async (f) => {
    if (!f || !f[0]) return;
    const file = f[0];
    const data = await file.arrayBuffer();
    const book = XLSX.read(data);
    workbook.update(() => book);
    sheets.update(() =>
      book.SheetNames.map((name) => ({ name, selected: false })),
    );
  });
</script>

<Modal bind:state closeButton={false} size="lg">
  <div class="title" slot="title">Import Assessment</div>
  <div class="body">
    {#if !$sheets.length}
      <p>Upload a file to import assessment</p>
      <input type="file" name="" id="" accept=".xlsx" bind:files={$fileList} />
    {:else}
      <div class="grid">
        <Card>
          <h4>General</h4>
          <div class="flex-col">
            <div class="flex-row">
              <label>Template</label>
              <DropDown size="sm" bind:value={$template}>
                <div slot="selected" class="template">{$template}</div>
                <div slot="list" class="flex-col">
                  <DropDownItem
                    size="sm"
                    value="BOSA"
                    bind:selection={$template}>Bosa</DropDownItem
                  >
                  <DropDownItem size="sm" value="FIN" bind:selection={$template}
                    >Fin</DropDownItem
                  >
                  <DropDownItem
                    size="sm"
                    value="OTHER"
                    bind:selection={$template}>Other</DropDownItem
                  >
                </div>
              </DropDown>
            </div>
            <div class="flex-row">
              <label>Type</label>
              <DropDown size="sm" bind:value={$type}>
                <div slot="selected" class="template">{$type}</div>
                <div slot="list" class="flex-col">
                  <DropDownItem size="sm" value="MCQ" bind:selection={$type}>
                    MCQ
                  </DropDownItem>
                  <DropDownItem size="sm" value="OQ" bind:selection={$type}>
                    OQ
                  </DropDownItem>
                </div>
              </DropDown>
            </div>
          </div>
        </Card>
        <Card></Card>
        <Card>
          <div class="flex-col">
            <h4>Sheets to import</h4>
            <div class="flex-col sheets">
              {#each $sheets as sheet}
                <div class="flex-row">
                  <Switch bind:checked={sheet.selected} />
                  {sheet.name}
                </div>
              {/each}
            </div>
          </div>
        </Card>
        <Card>
          <div class="flex-col">
            <h4>Column</h4>
            <div class="grid">
              <div class="flex-col">
                <div class="flex-row char">
                  <label for="">Competency</label>
                  <Char
                    max="Z"
                    bind:value={$columns.competency}
                    disabled={$template !== "OTHER"}
                  />
                </div>
                <div class="flex-row char">
                  <label for="">Dimension</label>
                  <Char
                    max="Z"
                    bind:value={$columns.dimension}
                    disabled={$template !== "OTHER"}
                  />
                </div>
                <div class="flex-row char">
                  <label for="">Indicator</label>
                  <Char
                    max="Z"
                    bind:value={$columns.indicator}
                    disabled={$template !== "OTHER"}
                  />
                </div>
              </div>
              <div class="flex-col">
                <div class="flex-row char">
                  <label for="">Question</label>
                  <Char
                    max="Z"
                    bind:value={$columns.question}
                    disabled={$template !== "OTHER"}
                  />
                </div>
                <div class="flex-row char">
                  <label for="">Answer</label>
                  <Char
                    max="Z"
                    bind:value={$columns.correct}
                    disabled={$template !== "OTHER"}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    {/if}
    <!-- {JSON.stringify($columns)} -->
  </div>

  <div class="footer" slot="footer">
    <Button type="danger" onClick={() => (state = false)}>Cancel</Button>
    <Button onClick={() => (advanced = !advanced)} disabled>Advanced</Button>
    <Button type="info">Import</Button>
  </div>
</Modal>

<style>
  .footer {
    display: flex;
    gap: 0.3rem;
  }
  .footer :global(> *:nth-child(2)) {
    margin-left: auto;
  }
  .flex-row {
    display: flex;
    gap: 0.3rem;
    align-items: center;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .grid {
    display: grid;
    gap: 0.3rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  label {
    margin-right: auto;
  }
  .char {
    max-width: 130px;
  }
  .sheets {
    flex-wrap: wrap;
    max-height: 100px;
  }
  h4 {
    margin-right: auto;
  }
  .template {
    width: 45px;
  }
</style>
