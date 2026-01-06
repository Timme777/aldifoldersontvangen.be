 (function ($) {



   Drupal.behaviors.mobileMenu = {
  attach: function (context, settings) {
    $('.mobile-menu-trigger').once('mybehaviour').click(function(e){
      $('.header__inner').toggleClass('menu-open');
      return false;
    });
  }
}

  Drupal.behaviors.faqToggle = {
    attach: function (context, settings) {
      $('.view-veelgestelde-vragen .views-row').once('mybehaviour').click(function(e){
        $(this).find(".field--name-field-faq-antwoord").slideToggle();
        $(this).toggleClass("faq-open");
        return false;
      });
    }
  }

  Drupal.behaviors.carousel = {
    attach: function (context, settings) {
      if($('body').hasClass('page-node-type-homepage')){
       $('.block-views-blockgetuigenissen-block-1 .view-content').not('.slick-initialized').once("mybehaviour").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        touchThreshold:100,
        speed:2000,
        accessibility: true,
        arrows: true,
        autoplay: true,
        draggable: true,
        swipeToSlide: true,
        // mobileFirst:true,  //add this one
        dots: false,
        swipe: true,
        pauseOnHover: true,
        prevArrow: '<i class="fi-xnslxl-chevron-solid"></i>',
        nextArrow: '<i class="fi-xnsrxl-chevron-solid"></i>',
        responsive: [
                    {
              breakpoint: 1160,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                // centerMode: true,
              }
            },
            {
              breakpoint: 537,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
              }
            }
          ]
        });
        var $slider = $('.block-views-blockgetuigenissen-block-1 .view-content');
        var $progressBar = $('.progress');
        var $progressBarLabel = $( '.slider__label' );

  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;

    $progressBar
      .css('background-size', calc + '% 100%')
      .attr('aria-valuenow', calc );

    $progressBarLabel.text( calc + '% completed' );
  });
      }
    }
  }

  Drupal.behaviors.scrollToFaq = {
    attach: function (context, settings) {
      $('.faq-button').click(function(e){
        var element = document.querySelector(".block-views-blockveelgestelde-vragen-block-1");
        if($('body').hasClass('page-node-type-page')){
          window.location.href = "/";
        }else{
          element.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
        return false;
      })
    }
  }

  Drupal.behaviors.homeBackground = {
    attach: function (context, settings) {
      if ($('body').is('.page-node-type-homepage,.page-node-type-page')){
        $('.views-field-field-homepage-headerafbeelding img').each(function(){
          var image = $(this);
          var wrapper = $(this).closest('.views-field-field-homepage-headerafbeelding');
          var background = $(image).attr('src');
          $(wrapper).css({'background-image': 'url(' + background + ')'
          });
        });
      }
    }
  }

  Drupal.behaviors.weekPicker = {
    attach: function (context, settings) {
      currentDate = new Date();
      startDate = new Date(currentDate.getFullYear(), 0, 1);
      var days = Math.floor((currentDate - startDate) /(24 * 60 * 60 * 1000));
      var weekNumber = Math.ceil(days / 7);
      var currentYear = currentDate.getFullYear();
      var maxDate = weekNumber + 2;
      flatpickr.localize(flatpickr.l10ns.nl);
      $(document).ready(function(){
         $(".weekPicker").once('myBehavior').flatpickr({
          "plugins": [new weekSelect({})],
          "dateFormat": "W-Y",
         /* "defaultDate": weekNumber+'-'+currentYear,*/
          "weekNumbers": "true",
          "maxDate": maxDate+'-'+currentYear,
          "mode": "single",
          "locale": {
            "firstDayOfWeek": 1 // start week on Monday
          },
          //  "onChange": [function(){
          // // extract the week number
          // // note: "this" is bound to the flatpickr instance
          //   var weekNumber = this.selectedDates[0]
          //       ? this.config.getWeek(this.selectedDates[0])
          //       : null;
          // }]
        });
      });


    }
  }


  Drupal.behaviors.folderForm = {
    attach: function (context, settings) {
       $(context).find('#folder__form').once('folderFormBehavior').each(function () {
      //$(document, context).once('myBehavior').each( function() {
        var body = $('body');
        let date = new Date();
        var query = "";
        const lang = document.getElementsByTagName("html")[0].getAttribute("lang");
        var now = date.toISOString().split('T')[0];
        var acutualYear = date.getFullYear();
        //this.tripStart = now;
         if(body.hasClass('path-frontpage')){
          var app = new Vue({
            delimiters: ['{','}'],
            el: '#folder__form',
            data: function() {
              return {
                firstName: '',
                lastName: '',
                remarks: 8,
                tripStart: now,
                postalCode: '',
                city: '',
                street: '',
                houseNumber: '',
                box: '',
                emailAddress: '',
                phoneNumber: '',
                description: '',
                weeknumber: this.getWeekNumber(date),
                week: this.getWeekNumber(date),
                lastNameValidity: 'valid',
                firstNameValidity: 'valid',
                postalCodeValidity: 'valid',
                cityValidity: 'valid',
                streetValidity: 'valid',
                houseNumberValidity: 'valid',
                boxValidity: 'valid',
                emailValidity: 'valid',
                descriptionValidity: 'valid',
                descriptionValiditySelect: '',
                validityCheck: 'valid',
                addressValidityCheck: '',
                remarkvalidation: '',
                phoneValidity: "false",
                disabled: false,
                tip: '',
                loading: '',
                loader: '',
                success:'',
                placeholder: ''
              }
            },
             watch: {
              /*postalCode: function (){
                  //axios.get( 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=S6IqEdKtcqfofhERyc5Osze-EGP3ri8ZlqDTJQaVsmE&query=België+'+this.postalCode+'+'+this.city+'+'+this.street).then(resp => {
                    //console.log(resp.data);
                  });
              },
              city: function (){
                  //axios.get( 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=S6IqEdKtcqfofhERyc5Osze-EGP3ri8ZlqDTJQaVsmE&query=België+'+this.postalCode+'+'+this.city+'+'+this.street).then(resp => {
                    //console.log(resp.data);
                  });
              },*/
              // street: function (){
              //    console.log("halloss");
              // }
            },
            mounted: function() {
              this.showDescription();
               this.$nextTick(function() {
               });
            },
            methods: {
              validateAddress(){
                if(this.street != '' && this.houseNumber != '' && this.postalCode != '' && this.city != ''){
                  var query = this.street+"+"+this.houseNumber+'+'+this.postalCode+'+'+this.city;
                  axios.get('https://geocode.search.hereapi.com/v1/geocode?q='+query+'&apiKey=S6IqEdKtcqfofhERyc5Osze-EGP3ri8ZlqDTJQaVsmE')
                    .then((result) => {
                        if(/*result.data.items[0].scoring.queryScore == 1 &&*/ result.data.items.length == 1){
                          if(result.data.items[0].scoring.fieldScore.streets !== undefined && result.data.items[0].scoring.fieldScore.houseNumber !== undefined && result.data.items[0].scoring.fieldScore.postalCode !== undefined){
                            if(result.data.items.length > 0 && result.data.items[0].scoring.fieldScore.streets[0] == '1' && result.data.items[0].scoring.fieldScore.houseNumber == '1' && result.data.items[0].scoring.fieldScore.postalCode == '1'){
                              if(result.data.items[0].scoring.fieldScore.city >= '0.98' || result.data.items[0].scoring.fieldScore.district >= '0.98'){
                                this.addressValidityCheck = "";
                                $('.folder__form--address').removeClass('invalid');
                                $('.folder__submit--error').removeClass('invalid');
                              }else{
                                this.addressValidityCheck = "invalid";
                                $('.folder__form--address').addClass('invalid');
                                $('.folder__submit--error').addClass('invalid');
                              }
                            }else{
                              this.addressValidityCheck = "invalid";
                              $('.folder__form--address').addClass('invalid');
                              $('.folder__submit--error').addClass('invalid');
                            }
                          }else{
                            this.addressValidityCheck = "invalid";
                            $('.folder__form--address').addClass('invalid');
                            $('.folder__submit--error').addClass('invalid');
                          }
                        }
                      else{
                        this.addressValidityCheck = "invalid";
                        $('.folder__form--address').addClass('invalid');
                        $('.folder__submit--error').addClass('invalid');
                      }
                   })
                  .catch((error) =>{
                      console.log(error);
                  })
                }

              },
              addressSuggestion(){
                axios.get( 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=S6IqEdKtcqfofhERyc5Osze-EGP3ri8ZlqDTJQaVsmE&query=België+'+this.postalCode+'+'+this.city).then(resp => {
                  if(resp.data.length !== 0){
                    if(this.postalCode != ""){
                      var addressData = resp.data['suggestions'][0].address.city;
                      this.city = addressData;
                    }
                  }
                });
              },
              getWeekNumber(date){
                startDate = new Date(date.getFullYear(), 0, 1);
                var days = Math.floor((date - startDate) /
                    (24 * 60 * 60 * 1000));

                var weekNumber = Math.ceil(days / 7);
                var acutualYear = date.getFullYear();
                return(weekNumber+'-'+acutualYear);
              },
              eraseValues(){
                this.city = "";
                this.postalCode = "";
                this.street = "";
                this.houseNumber = "";
              },
              submitForm(e){
                e.preventDefault();
                let complaintId = Number(this.remarks);
                var date = this.week.split('-');
                var year = parseInt(date[1]);
                var weekNumber = parseInt(date[0]);
                var query = "";
                var resource = "Web - Aldi";
                var mailSource = 1;
                var origin = "Consument"
                if(this.street != ''){
                  query += '+'+this.street;
                }
                if(this.houseNumber != ''){
                   query += '+'+this.houseNumber;
                }
                if(this.postalCode != ''){
                  query += '+'+this.postalCode;
                }
                if(this.city != ''){
                  query += '+'+this.city;
                }
                if(query != ""){
                  query = "België"+query;
                }
                if(this.descriptionValiditySelect == "invalid" && this.description == ""){
                  this.descriptionValidity = this.descriptionValiditySelect;
                }
                if(this.emailAddress == "klantendienst@aldi.be" || this.emailAddress == "serviceclients@aldi.be" || this.emailAddress == "kundenservice@aldi.be"){
                  resource = "Web - Aldi CUCA"
                }


                //var status = "";
                //week = this.getWeekNumber(date);
                var data = {
                  address: {
                    box: this.box,
                    city: this.city,
                    houseNumber: this.houseNumber,
                    postalCode: this.postalCode,
                    street: this.street
                  },
                  complaintMotiveId: complaintId,
                  description: this.description,
                  emailAddress: this.emailAddress,
                  firstName: this.firstName,
                  lastName: this.lastName,
                  mannerOfAddress: "MR",
                  phoneNumber: this.phoneNumber,
                  distributionYear: year,
                  distributionWeek: weekNumber,
                  resource: resource,
                  mailSource: mailSource,
                  language: lang
                };
                var dataDrupal = {
                  address: {
                    box: this.box,
                    city: this.city,
                    houseNumber: this.houseNumber,
                    postalCode: this.postalCode,
                    street: this.street
                  },
                  complaintMotiveId: complaintId,
                  description: this.description,
                  emailAddress: this.emailAddress,
                  firstName: this.firstName,
                  lastName: this.lastName,
                  mannerOfAddress: "MR",
                  phoneNumber: this.phoneNumber,
                  distributionYear: year,
                  distributionWeek: weekNumber,
                  status: '',
                  resource: resource,
                  mailSource: mailSource,
                  origin: origin
                };

                // check on empty fields

                  if(this.checkEmptyFields() !== 'invalid' && this.addressValidityCheck !== 'invalid'){
                    this.loading = 'show';
                    this.loader = '';
                    axios.post('https://compl-service-api-prd.eu.cloudhub.io/api/1.0/complaint', data,{
                          auth: {
                            username:'foldersontvangen',
                            password: '5r3TcZ2x9SOLluLy1HBwySfka8JWzU'
                          }
                        }
                      /*axios.post('https://compl-service-api-uat.eu.cloudhub.io/api/1.0/complaint', data,{
                          auth: {
                            username:'foldersontvangen',
                            password: 'rpbljUyc9FWY2pdS7SR2e7ShSqTJDA'
                          }
                        }*/
                    )

                    .then((response) => {
                      // handle success

                      var status = response.status;
                      this.createSubmission(dataDrupal, status);
                      //console.log(response);

                      })
                    .catch((error) =>{
                        // handle error
                        var status = error.response.status;
                        this.createSubmission(dataDrupal, status);
                        //this.loading = '';
                      })

                      this.loader = 'hide';
                      this.success = 'show';

                      var base_url = window.location.origin;
                      // send email through custom json page

                    axios.get(base_url+'/json-response?email='+this.emailAddress+'&name='+this.lastName+'&firstname='+this.firstName+'&lang='+lang+'&mailSource='+mailSource)

                    .then((response) => {
                      console.log(response);

                      })
                    .catch((error) =>{
                      console.log(response);
                      })

                      this.resetFormValues();
                      setTimeout(this.eraseSuccess,3000);
                }
              },
              resetFormValues(){
                this.firstName = '';
                this.lastName = '';
                this.postalCode = '';
                this.city = '';
                this.street = '';
                this.houseNumber = '';
                this.box = '';
                this.emailAddress = '';
                this.phoneNumber = '';
                this.description = '';
              },
              eraseSuccess(){
                 this.loading = '';
              },
              showTip(){
                let tips = [];
                 switch(lang) {
                  case 'nl':
                    tips[8] = '';
                    tips[16] = 'Je ontvangt jouw ALDI folder normaal gezien tussen zondagochtend en dinsdagavond.';
                    tips[12] = '';
                    tips[11] = '';
                    /*tips[13] = 'Je maakt het best gebruik van de officiële anti-reclamesticker.';*/
                    tips[17] = '';
                    tips[18] = '';
                  break;
                  case 'fr':
                    tips[8] = '';
                    tips[16] = "";
                    tips[12] = "";
                    tips[11] = "";
                    // tips[13] = "Il est préférable d'utiliser l'autocollant « Stop pub » officiel. Plus d'infos dans la foire aux questions."
                    tips[17] = '';
                    tips[18] = '';
                  break;
                  case 'de':
                    tips[8] = '';
                    tips[16] = '';
                    tips[12] = '';
                    tips[11] = '';
                    // tips[13] = 'Am besten nutzen Sie die offiziellen Keine-Werbung-Aufkleber. Weitere Informationen in den häufig gestellten Fragen.';
                    tips[17] = '';
                    tips[18] = '';
                  break;
                 }
                 this.tip = tips[this.remarks];
                if(this.remarks == '16'){
                    this.descriptionValiditySelect = 'invalid';
                 }else if(this.remarks == '17'){
                    this.descriptionValiditySelect = 'invalid';
                 }else if(this.remarks == '18'){
                    this.descriptionValiditySelect = 'invalid';
                 }
                 else{
                    this.descriptionValiditySelect = 'valid';
                    this.descriptionValidity = 'valid';
                 }
              },
              showDescription(){
                 let tips = [];
                 switch(lang) {
                  case 'nl':
                    tips[8] = 'Gelieve duidelijk aan te geven wanneer of hoelang je jouw ALDI-folder niet hebt ontvangen.';
                    tips[16] = 'Gelieve duidelijk aan te geven om welke folder het gaat en over welke week.';
                    tips[12] = 'Gelieve duidelijk aan te geven op welke dag je jouw folderpakket ontving.';
                    tips[11] = 'Gelieve duidelijk aan te geven op welke dag je jouw folderpakket ontving.';
                    /*tips[13] = 'Gelieve de locatie van de gevonden folder(s) (pakket(ten)) zo goed mogelijk te beschrijven.';*/
                    tips[17] = 'Gelieve de locatie van de gevonden folder(s) (pakket(ten)) zo goed mogelijk te beschrijven.';
                    tips[18] = 'Gelieve jouw vraag of opmerking te verduidelijken.';
                  break;
                  case 'fr':
                    tips[8] = 'Veuillez indiquer clairement quand ou depuis combien de temps vous n\'avez pas reçu votre paquet de folders.';
                    tips[16] = 'Veuillez indiquer clairement quel folder vous n\'avez pas reçu et quelle semaine.';
                    tips[12] = 'Veuillez indiquer le jour où vous avez reçu votre paquet.';
                    tips[11] = 'Veuillez indiquer clairement le jour où vous avez reçu votre paquet.';
                   /* tips[13] = 'Veuillez décrire le mieux possible l\'emplacement du ou des paquet(s) de folders trouvé(s).';*/
                    tips[17] = 'Veuillez décrire le mieux possible l\'emplacement du ou des paquet(s) de folders trouvé(s).';
                    tips[18] = 'Veuillez préciser votre question ou votre commentaire.';
                  break;
                 }
                //this.descriptionValidity = 'valid';
                this.placeholder = tips[this.remarks];
              },
              checkEmptyFields(){
                var statusEmptyFields = "";
                if(this.firstName === "" ){
                  this.firstNameValidity = 'invalid';
                  statusEmptyFields = 'invalid';
                }
                if(this.lastName === ""){
                   this.lastNameValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.postalCode === ""){
                   this.postalCodeValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.city === ""){
                   this.cityValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.street === ""){
                   this.streetValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.houseNumber === ""){
                   this.houseNumberValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.emailAddress === "" || this.validEmail(this.emailAddress) == false){
                   this.emailValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.descriptionValidity === 'invalid'){
                   statusEmptyFields = 'invalid';
                }
                return statusEmptyFields;
              },
              validatePhoneNumber(){
                //var re = /([0-9]{3}|[0-9]{2})[/]{1}([0-9]{2}|[0-9]{3})[0-9]{2}[0-9]{2}/gm;
                var re = /\+?\d{9}$/;
                var re = /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/;
                if(this.phoneNumber !== ""){
                  var result = re.test(this.phoneNumber);
                  if(result == false){
                    this.phoneValidity = 'invalid';
                  }else{
                    this.phoneValidity = 'valid'
                  }
                 }
               //return = re.test(phoneNumber);
              },
              validEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                //console.log(re.test(email));
                return re.test(email);
              },
              createSubmission(data, status){
                 data.language = lang;
                 data.status = status;
                 axios.post('/create-submission', data)
                  .then((response) =>{

                  })
                   .catch((error) =>{
                    //console.log(error);
                  })
              },
              validateCheck(element, word){
                if(element === ""){
                  switch(word) {
                    case 'firstNameValidity':
                      this.firstNameValidity = 'invalid';
                      break;
                    case 'lastNameValidity':
                       this.lastNameValidity = 'invalid';
                        break;
                    case 'houseNumberValidity':
                       this.houseNumberValidity = 'invalid';
                      break;
                    case 'streetValidity':
                       this.streetValidity = 'invalid';
                      break;
                    case 'cityValidity':
                       this.cityValidity = 'invalid';
                      break;
                    case 'postalCodeValidity':
                       this.postalCodeValidity = 'invalid';
                      break;
                    case 'emailValidity':
                       this.emailValidity = 'invalid';
                      break;
                    case 'descriptionValidity':
                      if(this.remarks == "16" || this.remarks == "17" || this.remarks == "18" && this.description == ""){
                       this.descriptionValidity = 'invalid';
                      }
                      break;
                  }
                }else{
                  switch(word) {
                    case 'firstNameValidity':
                      this.firstNameValidity = 'valid';
                      break;
                    case 'lastNameValidity':
                       this.lastNameValidity = 'valid';
                      break;
                    case 'houseNumberValidity':
                       this.houseNumberValidity = 'valid';
                      break;
                    case 'streetValidity':
                        this.streetValidity = 'valid';
                      break;
                     case 'cityValidity':
                         this.cityValidity = 'valid';
                        break;
                    case 'postalCodeValidity':
                        this.postalCodeValidity = 'valid';
                        break;
                     case 'emailValidity':
                       this.emailValidity = 'valid';
                      break;
                    case 'descriptionValidity':
                       this.descriptionValidity = 'valid';
                      break;
                  }
                }
              },
            }
          });
        }
      });
    }
  }
   Drupal.behaviors.folderFormCollegaNot = {
    attach: function (context, settings) {
       $(context).find('#folder__form_no').once('folderFormBehavior').each(function () {
      //$(document, context).once('myBehavior').each( function() {
        var body = $('body');
        let date = new Date();
        var query = "";
        const lang = document.getElementsByTagName("html")[0].getAttribute("lang");
        var now = date.toISOString().split('T')[0];
        var acutualYear = date.getFullYear();
        //this.tripStart = now;
         if(body.hasClass('page-nid--234')){
          var app = new Vue({
            delimiters: ['{','}'],
            el: '#folder__form_no',
            data: function() {
              return {
                firstName: '',
                lastName: '',
                remarks: 8,
                tripStart: now,
                postalCode: '',
                city: '',
                street: '',
                houseNumber: '',
                box: '',
                emailAddress: '',
                phoneNumber: '',
                description: '',
                weeknumber: this.getWeekNumber(date),
                week: this.getWeekNumber(date),
                lastNameValidity: 'valid',
                firstNameValidity: 'valid',
                postalCodeValidity: 'valid',
                cityValidity: 'valid',
                streetValidity: 'valid',
                houseNumberValidity: 'valid',
                boxValidity: 'valid',
                emailValidity: 'valid',
                descriptionValidity: 'valid',
                descriptionValiditySelect: '',
                validityCheck: 'valid',
                addressValidityCheck: '',
                remarkvalidation: '',
                phoneValidity: "false",
                disabled: false,
                tip: '',
                loading: '',
                loader: '',
                success:'',
                placeholder: ''
              }
            },
             watch: {
              /*postalCode: function (){
                  //axios.get( 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=S6IqEdKtcqfofhERyc5Osze-EGP3ri8ZlqDTJQaVsmE&query=België+'+this.postalCode+'+'+this.city+'+'+this.street).then(resp => {
                    //console.log(resp.data);
                  });
              },
              city: function (){
                  //axios.get( 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=S6IqEdKtcqfofhERyc5Osze-EGP3ri8ZlqDTJQaVsmE&query=België+'+this.postalCode+'+'+this.city+'+'+this.street).then(resp => {
                    //console.log(resp.data);
                  });
              },*/
              // street: function (){
              //    console.log("halloss");
              // }
            },
            mounted: function() {
              this.showDescription();
               this.$nextTick(function() {
               });
            },
            methods: {
              validateAddress(){
                if(this.street != '' && this.houseNumber != '' && this.postalCode != '' && this.city != ''){
                  var query = this.street+"+"+this.houseNumber+'+'+this.postalCode+'+'+this.city;
                  axios.get('https://geocode.search.hereapi.com/v1/geocode?q='+query+'&apiKey=S6IqEdKtcqfofhERyc5Osze-EGP3ri8ZlqDTJQaVsmE')
                    .then((result) => {
                        if(/*result.data.items[0].scoring.queryScore == 1 &&*/ result.data.items.length == 1){
                          if(result.data.items[0].scoring.fieldScore.streets !== undefined && result.data.items[0].scoring.fieldScore.houseNumber !== undefined && result.data.items[0].scoring.fieldScore.postalCode !== undefined){
                            if(result.data.items.length > 0 && result.data.items[0].scoring.fieldScore.streets[0] == '1' && result.data.items[0].scoring.fieldScore.houseNumber == '1' && result.data.items[0].scoring.fieldScore.postalCode == '1'){
                              if(result.data.items[0].scoring.fieldScore.city >= '0.98' || result.data.items[0].scoring.fieldScore.district >= '0.98'){
                                this.addressValidityCheck = "";
                                $('.folder__form--address').removeClass('invalid');
                                $('.folder__submit--error').removeClass('invalid');
                              }else{
                                this.addressValidityCheck = "invalid";
                                $('.folder__form--address').addClass('invalid');
                                $('.folder__submit--error').addClass('invalid');
                              }
                            }else{
                              this.addressValidityCheck = "invalid";
                              $('.folder__form--address').addClass('invalid');
                              $('.folder__submit--error').addClass('invalid');
                            }
                          }else{
                            this.addressValidityCheck = "invalid";
                            $('.folder__form--address').addClass('invalid');
                            $('.folder__submit--error').addClass('invalid');
                          }
                        }
                      else{
                        this.addressValidityCheck = "invalid";
                        $('.folder__form--address').addClass('invalid');
                        $('.folder__submit--error').addClass('invalid');
                      }
                   })
                  .catch((error) =>{
                      console.log(error);
                  })
                }

              },
              addressSuggestion(){
                axios.get( 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=S6IqEdKtcqfofhERyc5Osze-EGP3ri8ZlqDTJQaVsmE&query=België+'+this.postalCode+'+'+this.city).then(resp => {
                  if(resp.data.length !== 0){
                    if(this.postalCode != ""){
                      var addressData = resp.data['suggestions'][0].address.city;
                      this.city = addressData;
                    }
                  }
                });
              },
              getWeekNumber(date){
                startDate = new Date(date.getFullYear(), 0, 1);
                var days = Math.floor((date - startDate) /
                    (24 * 60 * 60 * 1000));

                var weekNumber = Math.ceil(days / 7);
                var acutualYear = date.getFullYear();
                return(weekNumber+'-'+acutualYear);
              },
              eraseValues(){
                this.city = "";
                this.postalCode = "";
                this.street = "";
                this.houseNumber = "";
              },
              submitForm(e){
                e.preventDefault();
                let complaintId = Number(this.remarks);
                var date = this.week.split('-');
                var year = parseInt(date[1]);
                var weekNumber = parseInt(date[0]);
                var query = "";
                var resource = "Web - Aldi Employee";
                var mailSource = 2;
                var origin = "Collega - No";
                if(this.street != ''){
                  query += '+'+this.street;
                }
                if(this.houseNumber != ''){
                   query += '+'+this.houseNumber;
                }
                if(this.postalCode != ''){
                  query += '+'+this.postalCode;
                }
                if(this.city != ''){
                  query += '+'+this.city;
                }
                if(query != ""){
                  query = "België"+query;
                }
                if(this.descriptionValiditySelect == "invalid" && this.description == ""){
                  this.descriptionValidity = this.descriptionValiditySelect;
                }


                //var status = "";
                //week = this.getWeekNumber(date);
                var data = {
                  address: {
                    box: this.box,
                    city: this.city,
                    houseNumber: this.houseNumber,
                    postalCode: this.postalCode,
                    street: this.street
                  },
                  complaintMotiveId: complaintId,
                  description: this.description,
                  emailAddress: this.emailAddress,
                  firstName: this.firstName,
                  lastName: this.lastName,
                  mannerOfAddress: "MR",
                  phoneNumber: this.phoneNumber,
                  distributionYear: year,
                  distributionWeek: weekNumber,
                  resource: resource,
                  mailSource: mailSource,
                  language: lang
                };
                var dataDrupal = {
                  address: {
                    box: this.box,
                    city: this.city,
                    houseNumber: this.houseNumber,
                    postalCode: this.postalCode,
                    street: this.street
                  },
                  complaintMotiveId: complaintId,
                  description: this.description,
                  emailAddress: this.emailAddress,
                  firstName: this.firstName,
                  lastName: this.lastName,
                  mannerOfAddress: "MR",
                  phoneNumber: this.phoneNumber,
                  distributionYear: year,
                  distributionWeek: weekNumber,
                  status: '',
                  origin: origin
                };

                // check on empty fields

                  if(this.checkEmptyFields() !== 'invalid' && this.addressValidityCheck !== 'invalid'){
                    this.loading = 'show';
                    this.loader = '';
                    axios.post('https://compl-service-api-prd.eu.cloudhub.io/api/1.0/complaint', data,{
                          auth: {
                            username:'foldersontvangen',
                            password: '5r3TcZ2x9SOLluLy1HBwySfka8JWzU'
                          }
                        }
                       /*axios.post('https://compl-service-api-uat.eu.cloudhub.io/api/1.0/complaint', data,{
                          auth: {
                            username:'foldersontvangen',
                            password: 'rpbljUyc9FWY2pdS7SR2e7ShSqTJDA'
                          }
                        }*/
                    )

                    .then((response) => {
                      // handle success

                      var status = response.status;
                      this.createSubmission(dataDrupal, status);
                      //console.log(response);

                      })
                    .catch((error) =>{
                        // handle error
                        var status = error.response.status;
                        this.createSubmission(dataDrupal, status);
                        //this.loading = '';
                      })

                      this.loader = 'hide';
                      this.success = 'show';

                      var base_url = window.location.origin;
                      // send email through custom json page

                    axios.get(base_url+'/json-response?email='+this.emailAddress+'&name='+this.lastName+'&firstname='+this.firstName+'&lang='+lang+'&mailSource='+mailSource)

                    .then((response) => {
                      //console.log(response);

                      })
                    .catch((error) =>{
                      console.log(response);
                      })

                      this.resetFormValues();
                      setTimeout(this.eraseSuccess,3000);
                }
              },
              resetFormValues(){
                this.firstName = '';
                this.lastName = '';
                this.postalCode = '';
                this.city = '';
                this.street = '';
                this.houseNumber = '';
                this.box = '';
                this.emailAddress = '';
                this.phoneNumber = '';
                this.description = '';
              },
              eraseSuccess(){
                 this.loading = '';
              },
              showTip(){
                let tips = [];
                 switch(lang) {
                  case 'nl':
                    tips[8] = '';
                    tips[16] = 'Je ontvangt jouw ALDI folder normaal gezien tussen zondagochtend en dinsdagavond.';
                    tips[12] = '';
                    tips[11] = '';
                    /*tips[13] = 'Je maakt het best gebruik van de officiële anti-reclamesticker.';*/
                    tips[17] = '';
                    tips[18] = '';
                  break;
                  case 'fr':
                    tips[8] = '';
                    tips[16] = "";
                    tips[12] = "";
                    tips[11] = "";
                    // tips[13] = "Il est préférable d'utiliser l'autocollant « Stop pub » officiel. Plus d'infos dans la foire aux questions."
                    tips[17] = '';
                    tips[18] = '';
                  break;
                  case 'de':
                    tips[8] = '';
                    tips[16] = '';
                    tips[12] = '';
                    tips[11] = '';
                    // tips[13] = 'Am besten nutzen Sie die offiziellen Keine-Werbung-Aufkleber. Weitere Informationen in den häufig gestellten Fragen.';
                    tips[17] = '';
                    tips[18] = '';
                  break;
                 }
                 this.tip = tips[this.remarks];
                if(this.remarks == '16'){
                    this.descriptionValiditySelect = 'invalid';
                 }else if(this.remarks == '17'){
                    this.descriptionValiditySelect = 'invalid';
                 }else if(this.remarks == '18'){
                    this.descriptionValiditySelect = 'invalid';
                 }
                 else{
                    this.descriptionValiditySelect = 'valid';
                    this.descriptionValidity = 'valid';
                 }
              },
              showDescription(){
                 let tips = [];
                 switch(lang) {
                  case 'nl':
                    tips[8] = 'Gelieve duidelijk aan te geven wanneer of hoelang je jouw ALDI-folder niet hebt ontvangen.';
                    tips[16] = 'Gelieve duidelijk aan te geven om welke folder het gaat en over welke week.';
                    tips[12] = 'Gelieve duidelijk aan te geven op welke dag je jouw folderpakket ontving.';
                    tips[11] = 'Gelieve duidelijk aan te geven op welke dag je jouw folderpakket ontving.';
                    /*tips[13] = 'Gelieve de locatie van de gevonden folder(s) (pakket(ten)) zo goed mogelijk te beschrijven.';*/
                    tips[17] = 'Gelieve de locatie van de gevonden folder(s) (pakket(ten)) zo goed mogelijk te beschrijven.';
                    tips[18] = 'Gelieve jouw vraag of opmerking te verduidelijken.';
                  break;
                  case 'fr':
                    tips[8] = 'Veuillez indiquer clairement quand ou depuis combien de temps vous n\'avez pas reçu votre paquet de folders.';
                    tips[16] = 'Veuillez indiquer clairement quel folder vous n\'avez pas reçu et quelle semaine.';
                    tips[12] = 'Veuillez indiquer le jour où vous avez reçu votre paquet.';
                    tips[11] = 'Veuillez indiquer clairement le jour où vous avez reçu votre paquet.';
                   /* tips[13] = 'Veuillez décrire le mieux possible l\'emplacement du ou des paquet(s) de folders trouvé(s).';*/
                    tips[17] = 'Veuillez décrire le mieux possible l\'emplacement du ou des paquet(s) de folders trouvé(s).';
                    tips[18] = 'Veuillez préciser votre question ou votre commentaire.';
                  break;
                 }
                //this.descriptionValidity = 'valid';
                this.placeholder = tips[this.remarks];
              },
              checkEmptyFields(){
                var statusEmptyFields = "";
                if(this.firstName === "" ){
                  this.firstNameValidity = 'invalid';
                  statusEmptyFields = 'invalid';
                }
                if(this.lastName === ""){
                   this.lastNameValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.postalCode === ""){
                   this.postalCodeValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.city === ""){
                   this.cityValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.street === ""){
                   this.streetValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.houseNumber === ""){
                   this.houseNumberValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.emailAddress === "" || this.validEmail(this.emailAddress) == false){
                   this.emailValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.descriptionValidity === 'invalid'){
                   statusEmptyFields = 'invalid';
                }
                return statusEmptyFields;
              },
              validatePhoneNumber(){
                //var re = /([0-9]{3}|[0-9]{2})[/]{1}([0-9]{2}|[0-9]{3})[0-9]{2}[0-9]{2}/gm;
                var re = /\+?\d{9}$/;
                var re = /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/;
                if(this.phoneNumber !== ""){
                  var result = re.test(this.phoneNumber);
                  if(result == false){
                    this.phoneValidity = 'invalid';
                  }else{
                    this.phoneValidity = 'valid'
                  }
                 }
               //return = re.test(phoneNumber);
              },
              validEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                //console.log(re.test(email));
                return re.test(email);
              },
              createSubmission(data, status){
                 data.language = lang;
                 data.status = status;
                 axios.post('/create-submission', data)
                  .then((response) =>{

                  })
                   .catch((error) =>{
                    //console.log(error);
                  })
              },
              validateCheck(element, word){
                if(element === ""){
                  switch(word) {
                    case 'firstNameValidity':
                      this.firstNameValidity = 'invalid';
                      break;
                    case 'lastNameValidity':
                       this.lastNameValidity = 'invalid';
                        break;
                    case 'houseNumberValidity':
                       this.houseNumberValidity = 'invalid';
                      break;
                    case 'streetValidity':
                       this.streetValidity = 'invalid';
                      break;
                    case 'cityValidity':
                       this.cityValidity = 'invalid';
                      break;
                    case 'postalCodeValidity':
                       this.postalCodeValidity = 'invalid';
                      break;
                    case 'emailValidity':
                       this.emailValidity = 'invalid';
                      break;
                    case 'descriptionValidity':
                      if(this.remarks == "16" || this.remarks == "17" || this.remarks == "18" && this.description == ""){
                       this.descriptionValidity = 'invalid';
                      }
                      break;
                  }
                }else{
                  switch(word) {
                    case 'firstNameValidity':
                      this.firstNameValidity = 'valid';
                      break;
                    case 'lastNameValidity':
                       this.lastNameValidity = 'valid';
                      break;
                    case 'houseNumberValidity':
                       this.houseNumberValidity = 'valid';
                      break;
                    case 'streetValidity':
                        this.streetValidity = 'valid';
                      break;
                     case 'cityValidity':
                         this.cityValidity = 'valid';
                        break;
                    case 'postalCodeValidity':
                        this.postalCodeValidity = 'valid';
                        break;
                     case 'emailValidity':
                       this.emailValidity = 'valid';
                      break;
                    case 'descriptionValidity':
                       this.descriptionValidity = 'valid';
                      break;
                  }
                }
              },
            }
          });
        }
      });
    }
  }
   Drupal.behaviors.folderFormCollegaYes = {
    attach: function (context, settings) {
       $(context).find('#folder__form_yes').once('folderFormBehavior').each(function () {
      //$(document, context).once('myBehavior').each( function() {
        var body = $('body');
        let date = new Date();
        var query = "";
        const lang = document.getElementsByTagName("html")[0].getAttribute("lang");
        var now = date.toISOString().split('T')[0];
        var acutualYear = date.getFullYear();
        console.log('ola');
        //this.tripStart = now;
         if(body.hasClass('page-nid--235')){
          var app = new Vue({
            delimiters: ['{','}'],
            el: '#folder__form_yes',
            data: function() {
              return {
                firstName: '',
                lastName: '',
                remarks: 8,
                tripStart: now,
                postalCode: '',
                city: '',
                street: '',
                houseNumber: '',
                box: '',
                emailAddress: '',
                phoneNumber: '',
                description: '',
                weeknumber: this.getWeekNumber(date),
                week: this.getWeekNumber(date),
                lastNameValidity: 'valid',
                firstNameValidity: 'valid',
                postalCodeValidity: 'valid',
                cityValidity: 'valid',
                streetValidity: 'valid',
                houseNumberValidity: 'valid',
                boxValidity: 'valid',
                emailValidity: 'valid',
                descriptionValidity: 'valid',
                descriptionValiditySelect: '',
                validityCheck: 'valid',
                addressValidityCheck: '',
                remarkvalidation: '',
                phoneValidity: "false",
                disabled: false,
                tip: '',
                loading: '',
                loader: '',
                success:'',
                placeholder: ''
              }
            },
             watch: {
              /*postalCode: function (){
                  //axios.get( 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=S6IqEdKtcqfofhERyc5Osze-EGP3ri8ZlqDTJQaVsmE&query=België+'+this.postalCode+'+'+this.city+'+'+this.street).then(resp => {
                    //console.log(resp.data);
                  });
              },
              city: function (){
                  //axios.get( 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=S6IqEdKtcqfofhERyc5Osze-EGP3ri8ZlqDTJQaVsmE&query=België+'+this.postalCode+'+'+this.city+'+'+this.street).then(resp => {
                    //console.log(resp.data);
                  });
              },*/
              // street: function (){
              //    console.log("halloss");
              // }
            },
            mounted: function() {
               this.$nextTick(function() {
               });
            },
            methods: {
              validateAddress(){
                if(this.street != '' && this.houseNumber != '' && this.postalCode != '' && this.city != ''){
                  var query = this.street+"+"+this.houseNumber+'+'+this.postalCode+'+'+this.city;
                  axios.get('https://geocode.search.hereapi.com/v1/geocode?q='+query+'&apiKey=S6IqEdKtcqfofhERyc5Osze-EGP3ri8ZlqDTJQaVsmE')
                    .then((result) => {
                        if(/*result.data.items[0].scoring.queryScore == 1 &&*/ result.data.items.length == 1){
                          if(result.data.items[0].scoring.fieldScore.streets !== undefined && result.data.items[0].scoring.fieldScore.houseNumber !== undefined && result.data.items[0].scoring.fieldScore.postalCode !== undefined){
                            if(result.data.items.length > 0 && result.data.items[0].scoring.fieldScore.streets[0] == '1' && result.data.items[0].scoring.fieldScore.houseNumber == '1' && result.data.items[0].scoring.fieldScore.postalCode == '1'){
                              if(result.data.items[0].scoring.fieldScore.city >= '0.98' || result.data.items[0].scoring.fieldScore.district >= '0.98'){
                                this.addressValidityCheck = "";
                                $('.folder__form--address').removeClass('invalid');
                                $('.folder__submit--error').removeClass('invalid');
                              }else{
                                this.addressValidityCheck = "invalid";
                                $('.folder__form--address').addClass('invalid');
                                $('.folder__submit--error').addClass('invalid');
                              }
                            }else{
                              this.addressValidityCheck = "invalid";
                              $('.folder__form--address').addClass('invalid');
                              $('.folder__submit--error').addClass('invalid');
                            }
                          }else{
                            this.addressValidityCheck = "invalid";
                            $('.folder__form--address').addClass('invalid');
                            $('.folder__submit--error').addClass('invalid');
                          }
                        }
                      else{
                        this.addressValidityCheck = "invalid";
                        $('.folder__form--address').addClass('invalid');
                        $('.folder__submit--error').addClass('invalid');
                      }
                   })
                  .catch((error) =>{
                      console.log(error);
                  })
                }

              },
              addressSuggestion(){
                axios.get( 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=S6IqEdKtcqfofhERyc5Osze-EGP3ri8ZlqDTJQaVsmE&query=België+'+this.postalCode+'+'+this.city).then(resp => {
                  if(resp.data.length !== 0){
                    if(this.postalCode != ""){
                      var addressData = resp.data['suggestions'][0].address.city;
                      this.city = addressData;
                    }
                  }
                });
              },
              getWeekNumber(date){
                startDate = new Date(date.getFullYear(), 0, 1);
                var days = Math.floor((date - startDate) /
                    (24 * 60 * 60 * 1000));

                var weekNumber = Math.ceil(days / 7);
                var acutualYear = date.getFullYear();
                return(weekNumber+'-'+acutualYear);
              },
              eraseValues(){
                this.city = "";
                this.postalCode = "";
                this.street = "";
                this.houseNumber = "";
              },
              submitForm(e){
                e.preventDefault();
                let complaintId = Number(this.remarks);
                var date = this.week.split('-');
                var year = parseInt(date[1]);
                var weekNumber = parseInt(date[0]);
                var query = "";
                var resource = "Web - Aldi Employee";
                var mailSource = 2;
                var origin = "Collega - Yes";
                if(this.street != ''){
                  query += '+'+this.street;
                }
                if(this.houseNumber != ''){
                   query += '+'+this.houseNumber;
                }
                if(this.postalCode != ''){
                  query += '+'+this.postalCode;
                }
                if(this.city != ''){
                  query += '+'+this.city;
                }
                if(query != ""){
                  query = "België"+query;
                }
                if(this.descriptionValiditySelect == "invalid" && this.description == ""){
                  this.descriptionValidity = this.descriptionValiditySelect;
                }


                //var status = "";
                //week = this.getWeekNumber(date);
                var data = {
                  address: {
                    box: this.box,
                    city: this.city,
                    houseNumber: this.houseNumber,
                    postalCode: this.postalCode,
                    street: this.street
                  },
                  complaintMotiveId: complaintId,
                  description: this.description,
                  emailAddress: this.emailAddress,
                  firstName: this.firstName,
                  lastName: this.lastName,
                  mannerOfAddress: "MR",
                  phoneNumber: this.phoneNumber,
                  distributionYear: year,
                  distributionWeek: weekNumber,
                  resource: resource,
                  language: lang
                };
                var dataDrupal = {
                  address: {
                    box: this.box,
                    city: this.city,
                    houseNumber: this.houseNumber,
                    postalCode: this.postalCode,
                    street: this.street
                  },
                  complaintMotiveId: '',
                  description: this.description,
                  emailAddress: this.emailAddress,
                  firstName: this.firstName,
                  lastName: this.lastName,
                  mannerOfAddress: "MR",
                  phoneNumber: this.phoneNumber,
                  distributionYear: year,
                  distributionWeek: weekNumber,
                  status: '',
                  origin: origin
                };

                // check on empty fields

                  if(this.checkEmptyFields() !== 'invalid' && this.addressValidityCheck !== 'invalid'){
                    this.loading = 'show';
                    this.loader = '';
                    /*axios.post('https://compl-service-api-prd.eu.cloudhub.io/api/1.0/complaint', data,{
                          auth: {
                            username:'foldersontvangen',
                            password: '5r3TcZ2x9SOLluLy1HBwySfka8JWzU'
                          }
                        }
                      axios.post('https://compl-service-api-uat.eu.cloudhub.io/api/1.0/complaint', data,{
                          auth: {
                            username:'foldersontvangen',
                            password: 'rpbljUyc9FWY2pdS7SR2e7ShSqTJDA'
                          }
                        }
                    )

                    .then((response) => {
                      // handle success

                      var status = response.status;
                      this.createSubmission(dataDrupal, status);
                      //console.log(response);

                      })
                    .catch((error) =>{
                        // handle error
                        var status = error.response.status;
                        this.createSubmission(dataDrupal, status);
                        //this.loading = '';
                      })*/
                      var status = '';
                      this.createSubmission(dataDrupal, status);
                      this.loader = 'hide';
                      this.success = 'show';

                      var base_url = window.location.origin;
                      // send email through custom json page

                    axios.get(base_url+'/json-response?email='+this.emailAddress+'&name='+this.lastName+'&firstname='+this.firstName+'&lang='+lang+'&mailSource='+mailSource)

                    .then((response) => {
                      //console.log(response);

                      })
                    .catch((error) =>{
                      console.log(response);
                      })

                      this.resetFormValues();
                      setTimeout(this.eraseSuccess,3000);
                }
              },
              resetFormValues(){
                this.firstName = '';
                this.lastName = '';
                this.postalCode = '';
                this.city = '';
                this.street = '';
                this.houseNumber = '';
                this.box = '';
                this.emailAddress = '';
                this.phoneNumber = '';
                this.description = '';
              },
              eraseSuccess(){
                 this.loading = '';
              },
              showTip(){
                let tips = [];
                 switch(lang) {
                  case 'nl':
                    tips[8] = '';
                    tips[16] = 'Je ontvangt jouw ALDI folder normaal gezien tussen zondagochtend en dinsdagavond.';
                    tips[12] = '';
                    tips[11] = '';
                    /*tips[13] = 'Je maakt het best gebruik van de officiële anti-reclamesticker.';*/
                    tips[17] = '';
                    tips[18] = '';
                  break;
                  case 'fr':
                    tips[8] = '';
                    tips[16] = "";
                    tips[12] = "";
                    tips[11] = "";
                    // tips[13] = "Il est préférable d'utiliser l'autocollant « Stop pub » officiel. Plus d'infos dans la foire aux questions."
                    tips[17] = '';
                    tips[18] = '';
                  break;
                  case 'de':
                    tips[8] = '';
                    tips[16] = '';
                    tips[12] = '';
                    tips[11] = '';
                    // tips[13] = 'Am besten nutzen Sie die offiziellen Keine-Werbung-Aufkleber. Weitere Informationen in den häufig gestellten Fragen.';
                    tips[17] = '';
                    tips[18] = '';
                  break;
                 }
                 this.tip = tips[this.remarks];
                if(this.remarks == '16'){
                    this.descriptionValiditySelect = 'invalid';
                 }else if(this.remarks == '17'){
                    this.descriptionValiditySelect = 'invalid';
                 }else if(this.remarks == '18'){
                    this.descriptionValiditySelect = 'invalid';
                 }
                 else{
                    this.descriptionValiditySelect = 'valid';
                    this.descriptionValidity = 'valid';
                 }
              },
              checkEmptyFields(){
                var statusEmptyFields = "";
                if(this.firstName === "" ){
                  this.firstNameValidity = 'invalid';
                  statusEmptyFields = 'invalid';
                }
                if(this.lastName === ""){
                   this.lastNameValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.postalCode === ""){
                   this.postalCodeValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.city === ""){
                   this.cityValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.street === ""){
                   this.streetValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.houseNumber === ""){
                   this.houseNumberValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.emailAddress === "" || this.validEmail(this.emailAddress) == false){
                   this.emailValidity = 'invalid';
                   statusEmptyFields = 'invalid';
                }
                if(this.descriptionValidity === 'invalid'){
                   statusEmptyFields = 'invalid';
                }
                return statusEmptyFields;
              },
              validatePhoneNumber(){
                //var re = /([0-9]{3}|[0-9]{2})[/]{1}([0-9]{2}|[0-9]{3})[0-9]{2}[0-9]{2}/gm;
                var re = /\+?\d{9}$/;
                var re = /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/;
                if(this.phoneNumber !== ""){
                  var result = re.test(this.phoneNumber);
                  if(result == false){
                    this.phoneValidity = 'invalid';
                  }else{
                    this.phoneValidity = 'valid'
                  }
                 }
               //return = re.test(phoneNumber);
              },
              validEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                //console.log(re.test(email));
                return re.test(email);
              },
              createSubmission(data, status){
                 data.language = lang;
                 data.status = status;
                 axios.post('/create-submission', data)
                  .then((response) =>{

                  })
                   .catch((error) =>{
                    //console.log(error);
                  })
              },
              validateCheck(element, word){
                if(element === ""){
                  switch(word) {
                    case 'firstNameValidity':
                      this.firstNameValidity = 'invalid';
                      break;
                    case 'lastNameValidity':
                       this.lastNameValidity = 'invalid';
                        break;
                    case 'houseNumberValidity':
                       this.houseNumberValidity = 'invalid';
                      break;
                    case 'streetValidity':
                       this.streetValidity = 'invalid';
                      break;
                    case 'cityValidity':
                       this.cityValidity = 'invalid';
                      break;
                    case 'postalCodeValidity':
                       this.postalCodeValidity = 'invalid';
                      break;
                    case 'emailValidity':
                       this.emailValidity = 'invalid';
                      break;
                    case 'descriptionValidity':
                      if(this.remarks == "16" || this.remarks == "17" || this.remarks == "18" && this.description == ""){
                       this.descriptionValidity = 'invalid';
                      }
                      break;
                  }
                }else{
                  switch(word) {
                    case 'firstNameValidity':
                      this.firstNameValidity = 'valid';
                      break;
                    case 'lastNameValidity':
                       this.lastNameValidity = 'valid';
                      break;
                    case 'houseNumberValidity':
                       this.houseNumberValidity = 'valid';
                      break;
                    case 'streetValidity':
                        this.streetValidity = 'valid';
                      break;
                     case 'cityValidity':
                         this.cityValidity = 'valid';
                        break;
                    case 'postalCodeValidity':
                        this.postalCodeValidity = 'valid';
                        break;
                     case 'emailValidity':
                       this.emailValidity = 'valid';
                      break;
                    case 'descriptionValidity':
                       this.descriptionValidity = 'valid';
                      break;
                  }
                }
              },
            }
          });
        }
      });
    }
  }


})(jQuery);


