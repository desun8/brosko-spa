<template lang="pug">
  #feedbackPage.feedback-page.main-feedback.is-active(@click="onClick")
    router-link.btn-back.js-modal-back(to="/")
    .scroll-wrap(v-if="isDesktop" data-scroll-lock-scrollable)
       .wrap(
          v-if="!showStatus"
        )
          h2.title
            | Отправить
            | сообщение

          label.label.label--name(ref="name")
            input.name(
              @input="handleInputChange"
              v-model="models.name"
              type="text"
              name="name"
              placeholder="Имя"
            )

          label.label.label--phone(ref="phone")
            input(
              @input="handleInputChange"
              @focus="onFocusPhone"
              @blur="onBlurPhone"
              v-model="models.phone"
              v-mask="'+7 (###) ###-##-##'"
              type="text"
              name="phone"
              placeholder="+ 7 (999) 999-99-99"
            )
      
          label.label.label--text(ref="text")
            textarea.message(
              @input="handleInputChange"
              v-model="models.text"
              cols="30"
              rows="8"
              name="text"
              placeholder="Ваш вопрос"
            )

          .custom-file-wrap
            label.custom-file(
              v-for="name in fileElm"
              :key="name"
              :for="name"
            )
              span.text Прикрепить файл
              input.file(
                @click="handleFileRemove"
                @change="handleFileAdd"
                :id="name"
                :name="name"
                :accept="accept.join(', ')"
                type="file"
              )

          VueRecaptcha#recaptcha.recaptcha(
            v-if="recaptchaKey"
            ref="recaptcha"
            :sitekey="recaptchaKey"
            :loadRecaptchaScript="true"
            @verify="onVerify"
          )

          label.custom-checkbox(ref="agreement" for="agreement-1")
            input.custom-checkbox_input(
              @change="handleInputChange"
              v-model="models.agreement"
              id="agreement-1"
              name="agreement"
              type="checkbox"
            )
            span.custom-checkbox_checkmark
            a(
              href="http://www.consultant.ru/document/cons_doc_LAW_61801/"
              target="_blank"
              rel="noopener noreferrer"
            )
              | Согласие на обработку персональных данных (в соотвествии с Федеральным законом 152-ФЗ от 27.07.06)

          button.submit(@click="handleSumbit" type="button") Отправить

    
    .wrap(
      v-if="!showStatus && !isDesktop"
      data-scroll-lock-scrollable
      )
      h2.title
        | Отправить
        | сообщение

      label.label.label--name(ref="name")
        input.name(
          @input="handleInputChange"
          v-model="models.name"
          type="text"
          name="name"
          placeholder="Имя"
        )

      label.label.label--phone(ref="phone")
        input(
          @input="handleInputChange"
          @focus="onFocusPhone"
          @blur="onBlurPhone"
          v-model="models.phone"
          v-mask="'+7 (###) ###-##-##'"
          type="text"
          name="phone"
          placeholder="+ 7 (999) 999-99-99"
        )
      
      label.label.label--text(ref="text")
        textarea.message(
          @input="handleInputChange"
          v-model="models.text"
          cols="30"
          rows="8"
          name="text"
          placeholder="Ваш вопрос"
        )

      .custom-file-wrap
        label.custom-file(
          v-for="name in fileElm"
          :key="name"
          :for="name"
        )
          span.text Прикрепить файл
          input.file(
            @click="handleFileRemove"
            @change="handleFileAdd"
            :id="name"
            :name="name"
            :accept="accept.join(', ')"
            type="file"
          )

      VueRecaptcha#recaptcha.recaptcha(
        v-if="recaptchaKey"
        ref="recaptcha"
        :sitekey="recaptchaKey"
        :loadRecaptchaScript="true"
        @verify="onVerify"
      )

      label.custom-checkbox(ref="agreement" for="agreement-1")
        input.custom-checkbox_input(
          @change="handleInputChange"
          v-model="models.agreement"
          id="agreement-1"
          name="agreement"
          type="checkbox"
        )
        span.custom-checkbox_checkmark
        a(
          href="http://www.consultant.ru/document/cons_doc_LAW_61801/"
          target="_blank"
          rel="noopener noreferrer"
        )
          | Согласие на обработку персональных данных (в соотвествии с Федеральным законом 152-ФЗ от 27.07.06)

      button.submit(@click="handleSumbit" type="button") Отправить

    .submit-status(v-if="showStatus" :class="{'error': submitError}")
      .icon
      .text {{submitError ? "сообщение не удалось отправить" : "сообщение успешно отправлено"}}
      button.btn-retry(@click="handleCloseStatus" type="button") Отправить повторно
</template>

<script>
import axios from "axios";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import VueRecaptcha from "vue-recaptcha";
import fixScrollLock from '../utils/fixScrollLock';

export default {
  components: {
    VueRecaptcha
  },
  data() {
    return {
      fileNamePrefix: 1,
      minFileElm: ["file-1"],
      showStatus: false,
      submitError: false,
      accept: [".pdf", ".png", ".jpeg", ".jpg", ".doc", ".docx"],
      models: {
        name: "",
        phone: "",
        text: "",
        agreement: ""
      },
      formData: {
        "g-recaptcha-response": null,
        tag: null,
        vacancy: null
      }
    };
  },
  computed: {
    // анимация появления/скрытия ФОС
    // toggleActive() {
    //   return morphAnimation(this.$refs.morphShape, this.$refs.morphShapeSvg);
    // },

    // Добавляем/удаляем дополнительные инпуты для файлов
    fileElm: {
      get() {
        return this.minFileElm;
      },

      set(val) {
        if (val === "add") {
          this.fileNamePrefix = this.fileNamePrefix + 1;
          this.minFileElm.push(`file-${this.fileNamePrefix}`);
        } else if (val === "reset") {
          this.minFileElm = ["file-1"];
        } else {
          const isAllowRemove = this.minFileElm.length > 0;
          if (isAllowRemove) {
            this.minFileElm = this.minFileElm.filter(name => name !== val);
          }
        }
      }
    },

    recaptchaKey() {
      const key = _$("meta[name='recaptcha-public-key']");
      return key?.content || null;
    },
    formTag() {
      return this.$store.state.formTag;
    },
    vacancy() {
      if (this.formTag === "vacancy") {
        return this.$store.state.vacancy;
      } else {
        return null;
      }
    },
    isDesktop() {
      return _isScreenLg;
    }
  },
  watch: {
    // если значение меняется, проигрываем анимацию
    // showFeedback(curr, prev) {
    //   if (curr !== prev) {
    //     this.toggleActive();
    //   }
    //   // Форма закрыта
    //   if (curr === false) {
    //     this.showStatus = false;
    //     this.submitError = false;
    //   }
    // }
  },
  mounted() {
    disablePageScroll();
    this.$store.dispatch("switchModalActive", true);
    // console.log(this.$refs.recaptcha);
    // this.$refs.recaptcha.reset();
    // if (isDesktop) {
      fixScrollLock(true, true, false);
    // }
  },
  destroyed() {
    enablePageScroll();
    this.$store.dispatch("switchModalActive", false);
    // if (isDesktop) {
      fixScrollLock(false, true, false);
    // }
  },
  methods: {
    onFocusPhone() {
      if (this.models.phone === "") this.models.phone = "+7 (";
    },
    onBlurPhone() {
      this.models.phone =
        this.models.phone === "+7 (" || this.models.phone.trim() === "+7"
          ? ""
          : this.models.phone;
    },
    handleFileAdd(e) {
      const ct = e.currentTarget;
      const file = ct.files[0];

      if (file) {
        console.warn(file);
        const replace = text => {
          const SIZE = 16;
          // Если текст не длинный, то возвращаем его
          if (text.length <= SIZE) return text;

          const match = text.match(/([\s\S]+)(\.[a-z]{1,6})$/);
          if (match === null) return text;
          const extension = match[2];
          const nameSize = SIZE - extension.length;
          const name = `${match[1].slice(0, 6)}...${match[1].slice(
            -(nameSize - 9)
          )}${extension}`;

          console.warn(name);

          return name;
        };

        const label = _$(`#feedbackPage label[for=${ct.id}]`);
        const labelText = label.querySelector(".text");

        label.classList.add("success");
        labelText.innerText = replace(file.name);
        labelText.title = file.name;

        // добавляем дополнительный инпут для файлов
        this.fileElm = "add";
      }
    },

    handleFileRemove(e) {
      const ct = e.currentTarget;
      const file = ct.files[0];

      if (file) {
        e.preventDefault();

        ct.value = null;

        const initText = "Прикрепить файл";
        const label = _$(`#feedbackPage label[for=${ct.id}]`);
        const labelText = label.querySelector(".text");

        label.classList.remove("success");
        labelText.innerText = initText;

        // удаляем дополнительный инпут для файлов
        this.fileElm = label.htmlFor;
      }
    },

    // Убираем класс "error", если инпут валидный
    handleInputChange(e) {
      if (this.models.name) {
        this.$refs.name.classList.remove("error");
      }

      if (this.models.phone.length === 18) {
        this.$refs.phone.classList.remove("error");
      }

      if (this.models.text) {
        this.$refs.text.classList.remove("error");
      }

      if (this.models.agreement) {
        this.$refs.agreement.classList.remove("error");
      }
    },

    onVerify(res) {
      this.formData["g-recaptcha-response"] = res;
    },

    handleSumbit() {
      const isValidate = this.checkForm();

      if (!isValidate) return false;

      // Создаем и наполняем FormData
      const createFormData = (form, files) => {
        const formData = new FormData();
        // Добавляем текстовую информацию
        form &&
          Object.keys(form).forEach(key => formData.append(key, form[key]));

        // Добавляем прикрепленные файлы
        files &&
          Object.keys(files).forEach(key =>
            formData.append("file[]", files[key], files[key].name)
          );

        return formData;
      };

      // Создаем объект для хранения файлов
      let filesData = {};
      const inputsFile = _$$("#feedbackPage input[type=file");
      inputsFile.forEach(input => {
        const { name } = input;
        const file = input.files[0];

        if (file) {
          filesData = { ...filesData, [name]: file };
        }
      });

      // Текстовые данные формы
      this.formData = {
        ...this.formData,
        tag: this.formTag,
        vacancy: this.vacancy
      };
      const data = { ...this.models, ...this.formData };

      axios
        .post("/api/v1/form", createFormData(data, filesData), {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          if (res.data.status === "ok") {
            this.submitError = false;
          } else {
            // не успешная отправка
            this.submitError = true;
          }
          this.showStatus = true;
        })
        .catch(err => {
          console.error(err);

          this.submitError = true;
          this.showStatus = true;
        });
    },

    handleCloseStatus() {
      this.showStatus = false;
      this.fileElm = "reset";
    },

    // Валиация формы при отправке
    checkForm() {
      const { name, phone, text, agreement } = this.$refs;
      const error = [];

      if (!this.models.name) error.push(name);

      if (!this.models.phone || this.models.phone.length !== 18)
        error.push(phone);

      if (!this.models.text) error.push(text);

      if (!this.models.agreement) error.push(agreement);

      if (error.length > 0) {
        error.forEach(elm => elm.classList.add("error"));
        return false;
      }

      return true;
    },

    onClick(e) {
      if (_isScreenLg) {
        const { currentTarget, target } = e;

        if (
          target === currentTarget ||
          target.classList.contains("scroll-wrap")
        ) {
          this.$router.push("/");
        }
      }
    }
  }
};
</script>

<style src="./Feedback.scss" lang="scss" scoped></style>