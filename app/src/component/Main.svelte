<script lang="ts">
  import db, {schema} from "$lib/db";
  import { refreshAssessment } from "$lib/store";

  import AssessmentView from "$view/Assessment.svelte";

  const insert = async () => {
    await db
      .insert(schema.assessmentSchema)
      .values({
        selection: "BNF24001",
        title: "Assessment" + Math.floor(Math.random() * 100),
        lang: "FR",
        level: "A1",
        type: "MCQ",
      })
      .execute();
    console.log("Inserted");
    refreshAssessment();
  };
</script>

<div class="main">
  <AssessmentView />
</div>

<style>
  .main {
    display: grid;
    gap: 0.5rem;
    flex: 1;
    padding: 0.3rem;
  }
</style>
