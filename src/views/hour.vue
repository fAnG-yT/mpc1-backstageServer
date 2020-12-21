<template>
    <div>
        <div>1小时活跃人数：{{hourNum}}</div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      hourNum:''
  };
  },
  created() {
    this.getHourNum();
  },
  methods: {
    async getHourNum() {
      const { data: res1 } = await this.$http.get(
        "/mychat/backgroup/getHourlyUV"
      );
      this.hourNum = res1;
    }
  }
};
</script>
