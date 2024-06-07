document.addEventListener('DOMContentLoaded', (event) => {
    const countdownForm = document.getElementById('countdownForm');
    const countdownDisplay = document.getElementById('countdown');
    let countdownInterval;

    countdownForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const dateInput = document.getElementById('date').value;
        const timeInput = document.getElementById('time').value;

        if (dateInput && timeInput) {
            const targetDate = new Date(`${dateInput}T${timeInput}`);
            startCountdown(targetDate);
        }
    });

    function startCountdown(targetDate) {
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            const now = new Date();
            const timeDifference = targetDate - now;

            if (timeDifference <= 0) {
                clearInterval(countdownInterval);
                countdownDisplay.innerHTML = "Countdown complete!";
                return;
            }

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }, 1000);
    }
});
