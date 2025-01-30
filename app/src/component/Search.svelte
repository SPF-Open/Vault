<script lang="ts">
  import { Card, Text } from "@gzlab/uui/index";
  import Button from "@gzlab/uui/input/Button.svelte";
  import Radio from "@gzlab/uui/input/RadioElement.svelte";
</script>

<div class="search">
  <Card>
    <div class="title" slot="title">🔍 Search</div>
    <div class="body">
      <div class="question">
        <div class="control">
          <Text placeholder="Question" />
          <div class="flex-h">
            <Radio group="questionSearch" value="MCQ">Contain</Radio>
            <Radio group="questionSearch" value="MCQ">Like</Radio>
            <Radio group="questionSearch" value="MCQ">Like (Unstable)</Radio>
            <Radio group="questionSearch" value="MCQ" checked>Disable</Radio>
          </div>
        </div>
      </div>
      <div class="answer">
        <div class="control">
          <Text placeholder="Answer" />
          <div class="flex-h">
            <Radio group="answerSearch" value="MCQ">Contain</Radio>
            <Radio group="answerSearch" value="MCQ">Like</Radio>
            <Radio group="answerSearch" value="MCQ">Like (Unstable)</Radio>
            <Radio group="answerSearch" value="MCQ" checked>Disable</Radio>
          </div>
        </div>
      </div>
    </div>
    <div class="control" slot="footer">
      <Button type="info">Search</Button>
    </div>
  </Card>
</div>

<style>
  .control {
    display: grid;
    gap: 0.3rem;
  }
  .flex-h {
    display: flex;
    gap: 0.6rem;
  }
  .body {
    display: grid;
    gap: 0.6rem;
  }
  .body > div:not(:last-child) {
    padding-bottom: 0.6rem;
    border-bottom: 1px solid var(--border-color);
  }
  .search {
    height: fit-content;
  }
</style>
