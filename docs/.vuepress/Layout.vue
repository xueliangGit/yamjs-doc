<script>
export default {
  mounted() {
    if (process.env.NODE_ENV === 'production') {
      const script = document.createElement('script')
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      script.async = true
      document.head.appendChild(script)
    }
  }
}
</script>

<template>
  <Layout />
</template>
