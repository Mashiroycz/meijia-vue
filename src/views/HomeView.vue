<script setup lang="ts">
import  CustomTable from "@/components/CustomTable.vue";
import  CustomTable2 from "@/components/CustomTable2.vue";

const formData = {
  field1: "f1",
  field2: "f2",
  field3: "f3",
  field4: "f4",
}
</script>

<template>
  <main>
    <CustomTable></CustomTable>
    <!-- <CustomTable2></CustomTable2> -->
    <CustomTable2 :dictObj="{}" :formData="formData" :fieldList="[]"></CustomTable2>
  </main>
</template>
