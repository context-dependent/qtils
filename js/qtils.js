(function(){

  let Q = Qualtrics.SurveyEngine;

  const utils = {

    // set an embedded data key value pair
    set_embedded_data : function(key, value) {
      Q.setEmbeddedData(key, value);
    },

    // retrieve the value of an embedded data key
    get_embedded_data : function(key) {
      return Q.getEmbeddedData(key);
    }, 

    // query nodes within the container for a question_object
    query_in_question : function(question_object, query) {
      let question_container = question_object.getQuestionContainer();
      let res = Array.from(question_container.querySelectorAll(query));

      return res;
    },
    

  }

  const helpers = {

    // get the id of the survey being submitted
    

  }

  const qtils = {

    autocomplete_text_input : function(question_id, input_id, data_list_url) {
  
      fetch(data_list_url)
        .then(function(response) {
          return response.json();
        })
        .then(function(dataList) {
          var input = document.getElementById(input_id);
          var data_list = dataList;
          var awesomplete = new Awesomplete(input, {
            list : data_list,
            filter: function(text, input) {
              var res = text.value.match(input) || text.label.indexOf(input) === 0;
              return res;
            },
            replace: function(text) {
              this.input.value = text.label;
            }, 
            container: function() {
              
              var question_container = document.getElementById(question_id); 
              var awesomplete_div = document.createElement("div");
              
              awesomplete_div.addClassName("awesomplete");
              awesomplete_div.id = question_id + "-awesomplete";
              awesomplete_div.style.marginLeft = "5%";
              awesomplete_div.style.position = "absolute";
              awesomplete_div.style.width = "85%";
              
              question_container.appendChild(awesomplete_div);
              
              
              
              return  document.getElementById(question_id + "-awesomplete");
              
            }
          });
        });
    },

    utils : utils,
    Q : Q,

  };

  if (window) {

      // Make sure we're not overwriting the qtils key
      if (!window.qtils) {
        window.qtils = qtils;
      } else {
        throw new Error('Error bootstrapping qtils: window.qtils already set.');
      }
        
    };

})();
