<script lang="ts">
  import "@gzlab/uui/main.css";

  import { onMount } from "svelte";
  import { errors, migrated } from "$lib/store";

  import migrate from "$lib/db/migrate";
  import Menu from "$comp/Menu.svelte";
  import Main from "$comp/Main.svelte";

  import { Modal, TopNav, DropDownLink, DropDown } from "@gzlab/uui/index";
  import Loading from "@gzlab/uui/gauge/Loading.svelte";
  import SideNav from "@gzlab/uui/nav/SideNav.svelte";

  onMount(() => {
    migrate()
      .then(() => {
        migrated.set(true);
      })
      .catch((err) => {
        errors.update((errors) => {
          return [
            ...errors,
            { title: "Migration Error", message: err.message },
          ];
        });
      });
  });
</script>

{#if !$migrated && $errors.length === 0}
  <Modal closeButton={false}>
    <div class="modal">
      <Loading show size="md" />
      <h2>Loading all modules <span class="emoji">🦄</span></h2>
    </div>
    {#each $errors as error}
      <div class="modal">
        <h2>{error.title}</h2>
        <p>{error.message}</p>
      </div>
    {/each}
  </Modal>
{/if}
<TopNav>
  <DropDownLink><span class="emoji">🧰</span> Vault</DropDownLink>
  <DropDownLink><span class="emoji">📄</span> Documentation</DropDownLink>
  <div class="right">
    <DropDown>
      <div class="header" slot="header">
        <span class="emoji">🧙‍♂️</span> Extra
      </div>
      <div class="extraTools" slot="body">
        <DropDownLink><span class="emoji">📥</span> Tao Import</DropDownLink>
        <DropDownLink><span class="emoji">⛏</span> Tao Forge</DropDownLink>
        <DropDownLink><span class="emoji">📤</span> Tao Export</DropDownLink>
      </div>
    </DropDown>
  </div>
</TopNav>
<main>
  <SideNav>
    <Menu />
  </SideNav>
  <Main />
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  main :global(> :nth-child(2)) {
    flex: 1;
  }
  main :global(> :nth-child(1)) {
    background-color: var(--bg-color);
  }
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .extraTools {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.3rem;
  }
  .right {
    margin-left: auto;
  }
  .emoji {
    font-size: 1.2em;
  }
</style>
