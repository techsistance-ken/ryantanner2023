<script>
   import Icon from "$lib/assets/hdr.png"

</script>

<!-- HEADER CODE -->
<div class="header" style="
  background-image: url({Icon});
  background-repeat: no-repeat;
  background-size: contain;
">
</div>
<!-- END OF HEADER CODE -->

<slot></slot>


<!-- FOOTER CODE -->

<style>
 .header {
    min-width: 320px;
    min-height: 120px;
    max-height: 200px;
    background-color: black;
    padding: 10px 4px 10px 4px;
 }
</style>