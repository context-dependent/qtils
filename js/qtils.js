function(){

	const qtils = {

		autocomplete_text_input : function(input_id, data_list_url) {
	
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
						}
					});
				});
		},


	};

	if (window) {

        // Make sure we're not overwriting the qtils key
        if (!window.qtils) {
            window.qtils = qtils;
        } else {
            throw new Error('Error bootstrapping qtils: window.qtils already set.');
        }
        
    };

}();