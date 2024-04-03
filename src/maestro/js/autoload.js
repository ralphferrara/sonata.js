
window.setInterval(function() { 
      return;
      fetch('/maestro/cachekey')
      .then(response => response.text())
      .then(respData => {
            const json = JSON.parse(respData);
            const cacheKey = json.key;
            var inputElement = document.getElementById('cachekey');
            if (!inputElement) {
                  ie          = document.createElement('input');
                  ie.type     = 'hidden'; // Make it hidden if you don't want it visible
                  ie.id       = 'cachekey';
                  ie.value    = cacheKey;
                  document.body.appendChild(ie); // Append it to the body or another container
            }            
            var inputElement  = document.getElementById('cachekey');
            var isMatch       = (inputElement.value === cacheKey) ? 'MATCH!' : 'NO MATCH! ' + inputElement.value + ' vs ' + cacheKey;
            console.log('Cache vs New -> ' + isMatch);
            if (cacheKey !== inputElement.value) {
                  console.log("RELOADING")
                  window.setTimeout(function() { window.location.reload(); }, 500);
            }
      }).catch(error => {
            console.log('Error:', error);
      });
}, 3000);