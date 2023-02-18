<script>
   import Icon from "$lib/assets/hdr.png"
   import "carbon-components-svelte/css/all.css";
   
   let theme = "g90"; // "white" | "g10" | "g80" | "g90" | "g100"

</script>

<!-- HEADER CODE -->
<div class="header" style="
  background-image: url({Icon});
  background-repeat: no-repeat;
  background-size: contain;
">
</div>
<!-- END OF HEADER CODE -->

<div class="my-body">
  <slot></slot>
</div>


<!-- FOOTER CODE -->
<div class="myfooter">
   About Guestbook
</div>


<style>
 .header {
    min-width: 320px;
    min-height: 120px;
    max-height: 200px;
    background-color: black;
    padding: 10px 4px 10px 4px;
 }

.myfooter {
   margin-top: 24px;
   padding: 12px;
   background-color: black;
   color: beige;
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   text-align: center;
}

 .my-body {
   padding-left: 10px;
   margin-bottom: 42px;
 }
</style>