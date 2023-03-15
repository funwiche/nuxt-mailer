<template>
  <v-container>
    <v-card
      max-width="540"
      color="transparent"
      flat
      rounded="0"
      class="mx-auto pa-4 pa-sm-6"
    >
      <h1 class="font-weight-black text-h5 text-sm-h4 mb-4">Send a message</h1>
      <v-form ref="form" @submit.prevent="submit">
        <v-text-field
          density="comfortable"
          label="Full name*"
          v-model="message.name"
          :rules="[(v) => !!v || 'Name is required']"
        />
        <v-text-field
          density="comfortable"
          label="Email*"
          v-model="message.email"
          type="email"
          :rules="[
            (v) => !!v || 'Email is required',
            (v) =>
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              'Enter a valid email address',
          ]"
        />
        <v-text-field
          density="comfortable"
          label="Phone (optional)"
          v-model="message.phone"
          type="tel"
        />
        <v-text-field
          density="comfortable"
          label="Subject*"
          v-model="message.subject"
          :rules="[(v) => !!v || 'Subject is required']"
        />
        <v-textarea
          density="comfortable"
          label="Message*"
          v-model="message.body"
          auto-grow
          :rules="[(v) => !!v || 'Message is required']"
        />
        <v-file-input
          density="comfortable"
          label="Attachment"
          v-model="file"
          multiple
        />
        <v-alert
          border
          v-if="error"
          density="compact"
          variant="tonal"
          color="error"
          icon="mdi-alert"
          class="mb-4 text-subtitle-2"
        >
          {{ error }}
        </v-alert>
        <v-alert
          border
          v-if="success"
          density="compact"
          variant="tonal"
          color="success"
          icon="mdi-check-circle"
          class="mb-4 text-subtitle-2"
        >
          {{ success }}
        </v-alert>
        <v-btn
          flat
          block
          color="info"
          type="submit"
          :loading="loading"
          size="large"
          rounded="0"
        >
          Submit
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
const form = ref(null);
const file = ref(null);
const loading = ref(false);
const message = ref({
  subject: "On-line form for registration",
  name: "Freundliche Grüsse",
  email: "chefidelis@gmail.com",
  phone: "+41 31 848 43 80",
  body: `Guten Tag Fidelis Funwi Che

Gerne teilen wir Ihnen Ihre Account-Daten mit:

Benutzername: QCGC
Benutzerpasswort: 5TF9YtIV

Bitte bewahren Sie diese Login Daten auf. Im Falle einer Immatrikulation werden Sie von der IT neue Login Daten erhalten, welche diese hier ablösen werden. Bis zu diesem Zeitpunkt können Sie die oben erwähnten Login Daten verwenden.

Wir freuen uns auf Ihre Online-Anmeldung
`,
});
const error = ref("");
const success = ref("");
watch(error, () => setTimeout(() => (error.value = null), 6000));
watch(success, () => setTimeout(() => (success.value = null), 6000));

const submit = async () => {
  try {
    const { valid } = await form.value.validate();
    if (!valid) return;
    loading.value = true;
    const body = new FormData();
    if (file.value) file.value.forEach((el) => body.append("attachments", el));
    body.append("message", JSON.stringify(message.value));
    const [data, err] = await $fetch("/api/mailer", {
      method: "post",
      body,
    });
    if (err) return (error.value = err);
    success.value = data;
    form.value.reset();
  } catch (error) {
    error.value = "An error occured. Please try again later";
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
