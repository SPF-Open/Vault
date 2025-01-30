<script lang="ts">
  import Table from "@gzlab/uui/table/Table.svelte";
  import { assessment } from "$lib/store";
</script>

<Table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Selection</th>
      <th>Language</th>
      <th>Level</th>
      <th>Links</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    {#each $assessment as { id, title, selection, lang, level, links, type } (id)}
      <tr>
        <td>{title}</td>
        <td>{selection}</td>
        <td>{lang}</td>
        <td>{level}</td>
        <td>{links}</td>
        <td>{type}</td>
      </tr>
    {/each}
  </tbody>
</Table>

<style>
  th {
    text-align: left;
  }
</style>
