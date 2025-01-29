<script lang="ts">
  import { Card } from "@gzlab/uui/index";
  import Button from "@gzlab/uui/input/Button.svelte";
</script>

<div class="menu">
  <Card>
    <div class="title" slot="title">Database</div>
      <div class="control">
        <Button type="danger">New</Button>
        <Button type="info">Open</Button>
        <Button type="success">Export</Button>
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
  .title{
    text-align: center;
  }
</style>
