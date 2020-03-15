<template>
  <div class="wrap  circle center">
    <p v-for="item in data">{{ item }}</p>
    <div class="a primary object circle">1</div>
    <div class="b success object circle">2</div>
    <div class="c secondary object circle">3</div>
    <div class="d accent object circle">4</div>
  </div>
</template>

<script>
export default {
  name: 'galaxy',
  async asyncData() {
    const { data } = await this.$api
      .get('asd')
      .then((response) => console.log(response))
      .catch((e) => console.log(e))
    return { data: data }
  }
}
</script>

<style lang="scss" scoped>
@mixin random-bgr() {
  background: rgb(random(255), random(255), random(255));
}

$wrap-diameter: 500px;
$object-diameter: 50px;

.wrap {
  background-color: transparent;
  border: dashed 2px #666666;
  width: $wrap-diameter;
  height: $wrap-diameter;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  border-radius: 50%;
}

.object {
  width: $object-diameter;
  height: $object-diameter;
  background-color: rgb(random(255), random(255), random(255));
  position: absolute;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 10s;
  overflow: hidden;
}

.object:hover {
  animation-play-state: paused;
}

.a {
  animation-name: rotateA;
}

.b {
  animation-name: rotateB;
}

.c {
  animation-name: rotateC;
}

.d {
  animation-name: rotateD;
}

.object:nth-child(odd) {
  animation-direction: reverse;
}

@keyframes rotateA {
  from {
    transform: rotate(0) rotate3d(0, 0, 0, 0) translateX($wrap-diameter/2);
  }
  to {
    transform: rotate(360deg) rotate3d(0, 0, 1, 360deg)
      translateX($wrap-diameter/2);
  }
}

@keyframes rotateB {
  from {
    transform: rotate(0) translateX(-$wrap-diameter/2);
    perspective: 500px;
  }
  to {
    transform: rotate(360deg) translateX(-$wrap-diameter/2);
    perspective: 1000px;
  }
}

@keyframes rotateC {
  from {
    transform: rotate(0) translateY($wrap-diameter/2);
  }
  to {
    transform: rotate(360deg) translateY($wrap-diameter/2);
  }
}

@keyframes rotateD {
  from {
    transform: rotate(0) translateY(-$wrap-diameter/2);
  }
  to {
    transform: rotate(360deg) translateY(-$wrap-diameter/2);
  }
}
</style>
