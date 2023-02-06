<script>
// @ts-nocheck
  import { guestBook } from '../../../../stores/guestbookSignature';
  import { createForm } from "svelte-forms-lib";
  import { db, Timestamp, addDoc, setDoc, collection } from '../../../../firebase';
  import * as yup from "yup";

  /** @type {import('./$types').PageData} */
  export let data;

  const decks = [
    "unknown",
    "Other",
    "2-Medical",
    "3-Plaza",
    "4-Promenade",
    "5-Entertainment",
    "6-Continental",
    "7-Sunrise",
    "8-Vista",
    "9-Panorama",
    "10-Sky",
    "11-Penthouse",
    "12-Resort",
    "14-Lido",
    "15-Lawn",
    "16-Solstice",
  ]
  const FRESH=0;
  const SAVING=1;
  const SAVED=2;
  const ERROR=3;

  let formState=FRESH

  let saving = formState==SAVING

  const { form, errors, state, handleChange, handleSubmit } = createForm({
  initialValues: {
    names: "",
    from: "",
    deck: data.hiddenObject.deck
  },
  validationSchema: yup.object().shape({
    deck: yup
          .string()
          .oneOf(decks)
          .required(),
    names: yup.string().required(),
    from: yup
      .string()
      .required()
  }),
  onSubmit: values => {
    formState = SAVING 
    console.log(values)
    const timeoutId = setTimeout(() => formState=ERROR, 10000)
    // Add a new document with a generated id.
    const docRef = addDoc(collection(db, `guestbook`), {
      names: values.names,
      from: values.from,
      deck: values.deck,
      created: Timestamp.now(),
      hiddenObject: data.key
    }).then(x => {
      console.log("added",x);
      clearTimeout(timeoutId);
      formState=SAVED
      return x;
      }
      ).catch(e => {
        console.log("error",e);
        formState=ERROR
        clearTimeout(timeoutId)
      });
  }
  });
</script>

<header>
<h2>{data.hiddenObject.displayName}</h2>
<p>{data.hiddenObject.description}</p>
</header>
<div>
    {#if formState==ERROR}
    <div>ERROR, Please refresh and try again later</div>
    {:else if formState==SAVED}
    <div>SAVED</div>
    {:else}
    <form on:submit|preventDefault={handleSubmit}>
        <label class="desc" id="names" for="names">Name(s)</label>
          <input 
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.names}
          placeholder="First Name(s)"
          disabled={formState==SAVING} id="names" name="names" type="text" class="field text fn">
          {#if $errors.names}
          <small>{$errors.names}</small>
        {/if}

        <label class="desc" id="from" for="from">Where Are You From?</label>
          <input 
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.from} 
          placeholder="State / Country"
          disabled={formState==SAVING} id="from" name="from" type="text" class="field text fn" size="8">
          {#if $errors.from}
          <small>{$errors.from}</small>
          {/if}
        <label class="desc" id="deck" for="deck">What Deck did you find {data.key}?</label>
          <select
          id="deck"
          name="deck"
          disabled={formState==SAVING}
          on:change={handleChange}
          bind:value={$form.deck}>
          <option />
          {#each decks as deck, i}
            <option>{deck}</option>
          {/each}
        </select>
        {#if $errors.deck}
          <small>{$errors.deck}</small>
        {/if} 
          {#if formState==SAVING}
            <label id=loading for=loading></label>
            <input id=loading style="display: none;"/><div class="lds-dual-ring"></div>
          {:else}
            <button type="submit">Sign Guestbook</button>
          {/if}
    </form>
    {/if}
</div>


<style>

.lds-dual-ring {
  display: inline-block;
  width: 40px;
  height: 40px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 24px;
  height: 24px;
  margin: 2px;
  border-radius: 50%;
  border: 6px solid #000;
  border-color: #000 transparent #000 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

:root {
  --primary-light: #a6f9d6;
  --primary: #5be2a9;
  --primary-dark: #53ce9a;
  --secondary: #1e2145;
  --white: #fff;
  --grey: #e6e6ff;
  --grey-dark: #6d7098;
  --red: #ff6b6b;
}

input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  max-width: 400px;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid var(--grey);
  border-radius: 4px;
  transition: all 150ms ease;
  background: var(--white);
}

select {
  height: 45px;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgb(227, 227, 245);
  border-color: var(--grey);
}

input:disabled,
select:disabled,
textarea:disabled {
  color: #ccc;
}

button {
  color: #fff;
  background-color: var(--primary);
  border: none;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  outline: none;
  border-radius: 4px;
  display: block;
  margin-top: 12px;
  line-height: 1.8;
  font-size: 12px;
  padding: 10px 18px;
  min-width: 120px;
  transition: all 150ms ease;
  cursor: pointer;
}

button:disabled {
  background-color: var(--grey);
}

button:focus:not(:disabled) {
  box-shadow: 0 0 0 4px var(--primary-light);
}

button:hover:not(:disabled) {
  background-color: var(--primary-dark);
}

label {
  display: block;
  color: var(--grey-dark);
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1.9px;
  line-height: 2;
}

/* used for errors */
small {
  display: block;
  font-size: 12px;
  color: var(--red);
  margin-top: 10px;
}
</style>
  