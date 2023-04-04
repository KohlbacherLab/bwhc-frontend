<template>
    <h1>{{ error.message }}</h1>
  </template>
  
  <script>
    export default {
      head() {
        return {
          title: `${this.statusCode} | ${this.message}`,
        }
      },
      props: {
        error: {
          type: Object,
          default: null
        }
      },
      computed: {
        statusCode() {
          return (this.error && this.error.statusCode) || 500;
        },
        message() {
          return this.error.message;
        }
      }
    }
  </script>