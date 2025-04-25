document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const calculatorForm = document.getElementById('calculatorForm');
    const clearBtn = document.getElementById('clearBtn');
    const resultsCard = document.getElementById('resultsCard');
    const absorptionResult = document.getElementById('absorptionResult');
    const prowessResult = document.getElementById('prowessResult');
    const errorAlert = document.getElementById('errorAlert');
    const errorMessage = document.getElementById('errorMessage');
    const armorWarning = document.getElementById('armorWarning');

    // Function to handle form submission
    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous error messages and warnings
        hideError();
        hideArmorWarning();
        
        // Get form data
        const formData = new FormData(calculatorForm);
        
        // Validate inputs
        const armor = parseFloat(formData.get('armor'));
        const damage = parseFloat(formData.get('damage'));
        
        if (isNaN(armor) || isNaN(damage)) {
            showError('Please enter valid numeric values for Armor and Damage.');
            return;
        }
        
        // Ensure values are positive
        if (armor < 0 || damage < 0) {
            showError('Please enter positive values for both Armor and Damage.');
            return;
        }
        
        // Show warning for armor values above 700
        if (armor > 700) {
            showArmorWarning();
        }
        
        // Add glow effect to input icons
        const armorIcon = document.querySelector('.col-md-6:nth-child(1) .input-group-text i');
        const damageIcon = document.querySelector('.col-md-6:nth-child(2) .input-group-text i');
        
        if (armorIcon && damageIcon) {
            armorIcon.classList.add('icon-glow');
            damageIcon.classList.add('icon-glow');
            
            // Remove icon glow class after animation completes
            setTimeout(() => {
                armorIcon.classList.remove('icon-glow');
                damageIcon.classList.remove('icon-glow');
            }, 1000);
        }
        
        // Calculate results directly in the browser
        const base = 250;
        
        // Calculate Absorption Coefficient: AC = (base^2) / ((base + armor)^2)
        const absorptionCoefficient = Math.pow(base, 2) / Math.pow(base + armor, 2);
        
        // Calculate Prowess Rating: PR = (damage * (base + armor)^2) / (base^2)
        const prowessRating = (damage * Math.pow(base + armor, 2)) / Math.pow(base, 2);
        
        // Display formatted results - Absorption as (1-AC)% to 2 decimal places, Prowess Rating to 2 decimal places
        const damageAbsorptionPercentage = (1 - absorptionCoefficient) * 100;
        absorptionResult.textContent = damageAbsorptionPercentage.toFixed(2) + '%';
        prowessResult.textContent = prowessRating.toFixed(2);
        resultsCard.style.display = 'block';
        
        // Add animation class for highlighting
        absorptionResult.classList.add('highlight');
        prowessResult.classList.add('highlight');
        
        // Remove highlight class after animation completes
        setTimeout(() => {
            absorptionResult.classList.remove('highlight');
            prowessResult.classList.remove('highlight');
        }, 1000);
    });
    
    // Function to clear form and results
    clearBtn.addEventListener('click', function() {
        calculatorForm.reset();
        resultsCard.style.display = 'none';
        hideError();
        hideArmorWarning();
    });
    
    // Function to show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorAlert.style.display = 'block';
    }
    
    // Function to hide error message
    function hideError() {
        errorAlert.style.display = 'none';
    }

    // Function to show armor warning
    function showArmorWarning() {
        armorWarning.style.display = 'block';
    }
    
    // Function to hide armor warning
    function hideArmorWarning() {
        armorWarning.style.display = 'none';
    }
    
    // Add input validation for better user experience
    const numericInputs = document.querySelectorAll('input[type="number"]');
    numericInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove any non-numeric characters except decimal point and minus sign
            if (this.value) {
                // Allow empty values for clearing
                const numericValue = this.value.replace(/[^\d.-]/g, '');
                
                // Ensure only one decimal point and one minus sign at the beginning
                let cleanedValue = '';
                let hasDecimal = false;
                let hasMinus = false;
                
                for (let i = 0; i < numericValue.length; i++) {
                    const char = numericValue[i];
                    
                    if (char === '-' && i === 0 && !hasMinus) {
                        cleanedValue += char;
                        hasMinus = true;
                    } else if (char === '.' && !hasDecimal) {
                        cleanedValue += char;
                        hasDecimal = true;
                    } else if (char !== '-' && char !== '.') {
                        cleanedValue += char;
                    }
                }
                
                this.value = cleanedValue;
            }
        });
    });
});