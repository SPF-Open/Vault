<script lang="ts">
  import { Card } from "@gzlab/uui/index";
  import Button from "@gzlab/uui/input/Button.svelte";
  import { exportData } from "./db";

  let link: HTMLAnchorElement;

  const onExport = async () => {
    console.log("Exporting database");
    const data = await exportData();
    console.log("Exported", data);
    if (link && data.blob) {
      link.href = URL.createObjectURL(data.blob);
      link.download = "database.sql";
      link.click();
    }
  };
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_invalid_attribute -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<a href="" class="download" bind:this={link} />

<div class="menu">
  <Card>
    <div class="title" slot="title">Database</div>
    <div class="control">
      <Button type="danger">New</Button>
      <Button type="info">Open</Button>
      <Button type="success" onClick={onExport}>Export</Button>
    </div>
  </Card>

  <Card>
    <div class="title" slot="title">Assesment</div>
    <div class="control">
      <Button type="info">Add</Button>
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
</style>
