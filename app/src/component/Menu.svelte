<script lang="ts">
  import { Card } from "@gzlab/uui/index";
  import Button from "@gzlab/uui/input/Button.svelte";
  import { clearDb, exportData } from "$lib/db";
  import { refreshAssessment } from "$lib/store";

  import ImportAssessment from "$comp/modal/ImportAssessment.svelte"

  let link: HTMLAnchorElement;

  const onNew = () => {
    clearDb();
    refreshAssessment();
  };

  const onExport = async () => {
    console.log("Exporting database");
    const data = await exportData();
    console.log("Exported", data);
    if (link && data.blob) {
      link.href = URL.createObjectURL(data.blob);
      link.download = "database.sql";
      link.click();
      console.log("Downloaded");
    }
  };

  let importAssessment = false;
</script>

<ImportAssessment bind:state={importAssessment} />

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_invalid_attribute -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<a href="" class="download" bind:this={link} />

<div class="menu">
  <Card>
    <div class="title" slot="title">📦 Database</div>
    <div class="control">
      <Button type="danger" onClick={onNew}>New</Button>
      <Button type="info">Import</Button>
      <Button type="success" onClick={onExport}>Export</Button>
      <div class="child">
        <Card>
          <div class="title" slot="title">📃 Assessment</div>
          <div class="control">
            <Button type="info" onClick={() => importAssessment = true}>Import</Button>
            <Button type="">View</Button>
          </div>
        </Card>
      </div>
    </div>
  </Card>
</div>

<style>
  .menu {
    margin-top: 0.3rem;
    display: grid;
    gap: 0.5rem;
  }
  .control {
    display: grid;
    gap: 0.3rem;
  }
  .title {
    text-align: center;
  }
  .download {
    display: none;
  }
  .child {
    margin-top: 0.3rem;
  }
</style>
