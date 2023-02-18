<script>
import { db, Timestamp, addDoc, setDoc, collection } from '../../firebase';
import {
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
  } from "carbon-components-svelte"; 

  /** @type {import('./$types').PageData} */
  export let data;


</script>

<h2>Guestbook</h2>


<StructuredList>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>Found</StructuredListCell>
        <StructuredListCell head>Names</StructuredListCell>
        <StructuredListCell head>Deck</StructuredListCell>
        <StructuredListCell head>Ducky</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    {#each data.count as signature, i}
    <StructuredListRow>
      <StructuredListCell>{signature.created.toDate().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</StructuredListCell>
      <StructuredListCell>{signature.names}</StructuredListCell>
      <StructuredListCell>{signature.deck}</StructuredListCell>
      <StructuredListCell>{signature.hiddenObject}</StructuredListCell>
    </StructuredListRow>
    {/each} 
  </StructuredList>


<style>
</style>