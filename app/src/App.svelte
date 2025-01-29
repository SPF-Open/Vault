<script lang="ts">
  import "@gzlab/uui/main.css";

  import { onMount } from "svelte";
  import { migrated } from "./lib/store";

  import Loading from "@gzlab/uui/gauge/Loading.svelte";
  import SideNav from "@gzlab/uui/nav/SideNav.svelte";
  import migrate from "./lib/db/migrate";
  import Menu from "./lib/Menu.svelte";
  import Main from "./lib/Main.svelte";
  import { Modal } from "@gzlab/uui/index";

  onMount(async () => {
    await migrate().then(() => {
      migrated.set(true);
    });
  });
</script>

{#if !$migrated}
  <Modal closeButton={false}>
    <div class="modal">
      <Loading show size="md" />
      <h2>Loading all modules 🐱‍🏍</h2>
    </div>
  </Modal>
{/if}

<main>
  <SideNav>
    <Menu />
  </SideNav>
  <Main />
</main>

<style>
  main {
    min-height: 100vh;
    display: flex;
    gap: 0.3rem;
  }
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
