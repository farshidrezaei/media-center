<template>
  <v-container class="fill-height" fluid>
    <v-card class="fill-height" width="100%">
      <v-row class="fill-height" align="center">
        <v-col cols="12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <div class="pa-4 fill-height text-center">
                <v-img
                  class="mb-4"
                  contain
                  height="128"
                  src="/favicon/logo.svg"
                ></v-img>
                <h3 class="title font-weight-light mb-2">The Bank</h3>
                <span class="caption grey--text"></span>
              </div>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-row justify="center" align="center">
                  <v-col cols="12">
                    <vue-phone-number-input
                      v-model="mobileInput"
                      :dark="$vuetify.theme.dark"
                      default-country-code="IR"
                      @update="mobileInputUpdated"
                    />
                    <p class="caption grey--text justify text--darken-1 mt-2">
                      This is the mobile number you will use to login to your
                      account. We will send verification code to this number.
                    </p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <v-card-text>
                <v-sms-verification-input
                  :amount="6"
                  @codeEntered="getCode"
                ></v-sms-verification-input>
                <span class="caption grey--text text--darken-1">
                  Please enter verification code that was sent to
                  <strong>{{ mobile }}</strong
                  >.
                  <br />
                  Haven't received code yet?
                </span>
                <v-btn
                  ref="next"
                  text
                  x-small
                  color="primary"
                  class="text--center"
                  >resend code</v-btn
                >
              </v-card-text>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>

      <v-footer absolute>
        <v-btn :disabled="backDisableConditions" text small @click="step--">
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="nextDisableConditions"
          :loading="verification_code_loading || send_verification_code_loading"
          color="primary"
          outlined
          rounded
          small
          @click="next()"
        >
          Next
        </v-btn>
      </v-footer>
    </v-card>
  </v-container>
</template>

<script>
import VSmsVerificationInput from '../components/VSmsVerificationInput'

export default {
  components: { VSmsVerificationInput },
  layout: 'auth',
  data() {
    return {
      step: 1,
      mobileInput: '',
      mobile: '',
      isValidMobileNumber: false,
      verification_code: null,
      send_verification_code_loading: false,
      verification_code_loading: false
    }
  },
  computed: {
    nextDisableConditions() {
      return (
        (!this.isValidMobileNumber && this.step === 2) ||
        this.step === 4 ||
        this.send_verification_code_loading ||
        this.verification_code_loading ||
        (this.step === 3 && this.code === null)
      )
    },
    backDisableConditions() {
      return (
        this.step === 1 ||
        this.send_verification_code_loading ||
        this.verification_code_loading
      )
    }
  },
  methods: {
    mobileInputUpdated(val) {
      this.mobile = val.formattedNumber
      this.isValidMobileNumber = val.isValid
    },
    next() {
      switch (this.step) {
        case 1:
          this.step++
          break
        case 2:
          this.send_verification_code_loading = true
          this.$axios
            .post('auth/check-mobile', { mobile: this.mobile })
            .then((response) => {
              this.send_verification_code_loading = false
              this.step++
              this.$notify({
                group: 'all',
                type: 'success',
                text: response.data.message
              })
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error))
            .finally(() => (this.send_verification_code_loading = false))
          break
        case 3:
          this.verification_code_loading = true
          this.$axios
            .post('auth/login', {
              mobile: this.mobile,
              verification_code: this.verification_code
            })
            .then((response) => {
              this.$auth.setUserToken(response.data.token).then(() => {
                this.$notify({
                  group: 'all',
                  type: 'success',
                  text: 'Thank you for registration.',
                  duration: -1
                })
                this.$router.push('/user-update')
              })
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error.response)
              this.$notify({
                text: error.response.data.message,
                group: 'all',
                type: 'error',
                width: '100%'
              })
            })
            .finally(() => (this.verification_code_loading = false))

          setTimeout(() => {}, 2000)
          break
      }
    },
    getCode(code) {
      this.verification_code = code
    }
  }
}
</script>

<style lang="scss">
.container {
  align-items: center;
  justify-content: center;
}
</style>
