<script lang="ts">
  import { Card, Char, Modal, Numeric, Switch } from "@gzlab/uui/index";
  import Button from "@gzlab/uui/input/Button.svelte";
  import DropDown from "@gzlab/uui/input/DropDown.svelte";
  import DropDownItem from "@gzlab/uui/input/DropDownItem.svelte";

  import { MCQ } from "@lv00/tao-parser";

  import { writable } from "svelte/store";
  import * as XLSX from "xlsx";
  import {
    defaultColumns,
    defaultRows,
    type Columns,
    type Sheet,
    type Template,
    type Type,
  } from "./helper";

  export let state = false;
  let advanced = false;
  const template = writable<Template>("BOSA");
  const type = writable<Type>("MCQ");
  const sheets = writable<Sheet[]>([]);

  const fileList = writable<FileList | undefined>();
  const workbook = writable<XLSX.WorkBook>();
  const columns = writable<Columns>();
  const row = writable<{ offset: number }>({ offset: 0 });

  const questions = new Map();

  template.subscribe((template) => {
    if (template === "OTHER") return;
    columns.update((c) => {
      const column = defaultColumns.get(template);
      if (!column) return c;
      return column[$type];
    });
    row.update((r) => {
      const rows = defaultRows.get(template);
      if (!rows) return r;
      return rows[$type];
    });
  });

  fileList.subscribe(async (f) => {
    if (!f || !f[0]) return;
    const file = f[0];
    const data = await file.arrayBuffer();
    const book = XLSX.read(data);
    workbook.update(() => book);
    sheets.update(() =>
      book.SheetNames.map((name) => ({ name, selected: false }))
    );
  });

  sheets.subscribe(async (s) => {
    if (!s.length) return;
    const sheet = s.find((sheet) => sheet.selected);
    if (!sheet) return;
    const book = $workbook;
    const data = book.Sheets[sheet.name];
    const question = MCQ.fromSHeet(data, $columns, { ...$row, alternative: 4 });
    console.log(data, question);
    questions.set(sheet.name, question);
  });
</script>

<Modal bind:state closeButton={false} size="lg">
  <div class="title" slot="title">Import Assessment</div>
  <div class="flex-col body">
    <Card>
      <div class="flex-col">
        <h4>Upload a file to import assessment</h4>
        <input
          type="file"
          name=""
          id=""
          accept=".xlsx"
          bind:files={$fileList}
        />
      </div>
    </Card>
    {#if $sheets.length}
      <div class="flex-row options">
        <Card size="sm">
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
        <Card size="sm">
          <div class="flex-col">
            <h4>Column</h4>
            <div class="flex-col">
              <div class="flex-row char">
                <label for="">Competence</label>
                <Char max="ZZ" bind:value={$columns.competence} />
              </div>
              <div class="flex-row char">
                <label for="">Dimension</label>
                <Char max="ZZ" bind:value={$columns.dimension} />
              </div>
              <div class="flex-row char">
                <label for="">Indicator</label>
                <Char max="ZZ" bind:value={$columns.indicator} />
              </div>
            </div>
          </div></Card
        >
        <Card size="sm">
          <div class="flex-col">
            <h4>Rows</h4>
            <div class="flex-col">
              <div class="flex-row char">
                <label for="">Question</label>
                <Char max="ZZ" bind:value={$columns.question} />
              </div>
              <div class="flex-row char">
                <label for="">Answer</label>
                <Char max="ZZ" bind:value={$columns.answer} />
              </div>
              <div class="flex-row char">
                <label for="">Offset</label>
                <Numeric max={99} bind:value={$row.offset} />
              </div>
            </div>
          </div>
        </Card>
      </div>
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
      <div class="flex-row"></div>
    {/if}
  </div>
  <!-- {JSON.stringify($columns)} -->
  <pre>
  {JSON.stringify(Array.from(questions), null, 2)}
   </pre>

  <div class="footer" slot="footer">
    <Button type="danger" onClick={() => (state = false)}>Cancel</Button>
    <Button onClick={() => (advanced = !advanced)} disabled>Advanced</Button>
    <Button disabled={!$workbook}>Preview</Button>
    <Button type="info" disabled={!$workbook}>Next</Button>
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
  .options {
    align-items: stretch;
  }
  label {
    margin-right: auto;
  }
  .sheets {
    flex-wrap: wrap;
    max-height: 75px;
    align-content: start;
    gap: 0.3rem 0.6rem;
  }
  h4 {
    margin-right: auto;
    margin-bottom: 0.3rem;
  }
  .template {
    width: 45px;
  }
</style>
