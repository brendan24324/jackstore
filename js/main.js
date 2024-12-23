// Function to send order details to Telegram
async function sendTelegramOrder(userId, zoneId, items) {
    const BOT_TOKEN = "7841121878:AAEndYtIXwASGp-S7om_2esAt4n2qAF75_4";
    const CHAT_ID = "-1002327210773";
    
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: `${userId} ${zoneId} ${items}`
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.ok;
  
    } catch (error) {
      console.error("Failed to send order:", error);
      return false;
    }
  }
  
  // Example usage in your payment flow:
  function handlePaymentSubmit() {
    console.log('Payment submitted');
    const userId = document.getElementById('userid').value;
    const zoneId = document.getElementById('zoneid').value;
    const selectedRadio = document.querySelector('input[name="radio"]:checked');
    const items = selectedRadio ? selectedRadio.value : '';
  
    if (userId && zoneId && items) {
      sendTelegramOrder(userId, zoneId, items)
        .then(success => {
          if (success) {
            console.log('Order sent successfully');
            // Handle success (e.g., show success message)
          } else {
            console.log('Failed to send order');
            // Handle failure (e.g., show error message)
          }
        });
    }
  }