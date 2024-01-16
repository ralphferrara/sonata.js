
window.setInterval(function() { 
      fetch('/maestro/cachekey')
      .then(response => response.text())
      .then(respData => {
            const json = JSON.parse(respData);
            const cacheKey = json.key;
            const inputElement = document.getElementById('cachekey');
            var isMatch = (inputElement.value === cacheKey) ? 'MATCH!' : 'NO MATCH! ' + inputElement.value + ' vs ' + cacheKey;
            console.log('Cache vs New -> ' + isMatch);
            if (cacheKey !== inputElement.value) {
                  console.log("RELOADING")
                  window.setTimeout(function() { window.location.reload(); }, 500);
            }
      }).catch(error => {
            console.log('Error:', error);
      });
}, 3000);