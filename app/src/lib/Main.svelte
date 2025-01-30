<script lang="ts">
  import Button from "@gzlab/uui/input/Button.svelte";
  import db from "./db";
  import { assessmentSchema } from "./db/schema";


  
  const insert = async () => {
    await db
      .insert(assessmentSchema)
      .values({
        selection: "BNF24001",
        title: "Assessment" + Math.floor(Math.random() * 100),
        lang: "FR",
        level: "A1",
        type: "MCQ",
      })
      .execute();
    console.log("Inserted");
  };
</script>

<div class="main">
  Main
  <Button onClick={insert}>Insert</Button>
</div>

<style>
  .main {
    display: grid;
    gap: 0.5rem;
    flex: 1;
  }
</style>
