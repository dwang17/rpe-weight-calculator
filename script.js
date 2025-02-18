function calculateWeight(){
    const rpe = parseFloat(document.getElementById("RPESelection").value);
    const reps = parseInt(document.getElementById("RepSelection").value);
    const max = parseFloat(document.getElementById("MaxWeight").value);

    if (isNaN(max) || max <= 0) {
        alert("Please enter a valid max.");
        return;
    }

    const multipliers = {
        "10": { "1": 1.00, "2": 0.955, "3": 0.922, "4": 0.892, "5": 0.863, "6": 0.837, "7": 0.811, "8": 0.786, "9": 0.762, "10": 0.739,
                "11": 0.707, "12": 0.68, "13": 0.653, "14": 0.626, "15": 0.599 },
        "9.5": { "1": 0.9775, "2": 0.9385, "3": 0.907, "4": 0.8775, "5": 0.85, "6": 0.824, "7": 0.7985, "8": 0.774, "9": 0.75, "10": 0.723,
                "11": 0.6935, "12": 0.6665, "13": 0.6395, "14": 0.6125, "15": 0.599 },
        "9": { "1": 0.955, "2": 0.922, "3": 0.892, "4": 0.863, "5": 0.837, "6": 0.811, "7": 0.786, "8": 0.762, "9": 0.739, "10": 0.707,
                "11": 0.68, "12": 0.653, "13": 0.626, "14": 0.599, "15": 0.572 },
        "8.5": { "1": 0.9385, "2": 0.907, "3": 0.8775, "4": 0.85, "5": 0.824, "6": 0.7985, "7": 0.774, "8": 0.75, "9": 0.723, "10": 0.6935,
                "11": 0.6665, "12": 0.6395, "13": 0.6125, "14": 0.5855, "15": 0.5585 },
        "8": { "1": 0.922, "2": 0.892, "3": 0.863, "4": 0.837, "5": 0.811, "6": 0.786, "7": 0.762, "8": 0.739, "9": 0.707, "10": 0.68,
                "11": 0.653, "12": 0.626, "13": 0.599, "14": 0.572, "15": 0.545 },
        "7.5": { "1": 0.907, "2": 0.8775, "3": 0.85, "4": 0.824, "5": 0.7985, "6": 0.774, "7": 0.75, "8": 0.723, "9": 0.6935, "10": 0.6665,
                "11": 0.6395, "12": 0.6125, "13": 0.5855, "14": 0.5585, "15": 0.5315 },
        "7": { "1": 0.892, "2": 0.863, "3": 0.837, "4": 0.811, "5": 0.786, "6": 0.762, "7": 0.739, "8": 0.707, "9": 0.68, "10": 0.653,
                "11": 0.626, "12": 0.599, "13": 0.572, "14": 0.545, "15": 0.518 },
        "6.5": { "1": 0.8775, "2": 0.85, "3": 0.824, "4": 0.7985, "5": 0.774, "6": 0.75, "7": 0.723, "8": 0.6935, "9": 0.6665, "10": 0.6395,
                "11": 0.6125, "12": 0.5855, "13": 0.5585, "14": 0.5315, "15": 0.5045 },
        "6": { "1": 0.863, "2": 0.837, "3": 0.811, "4": 0.786, "5": 0.762, "6": 0.739, "7": 0.707, "8": 0.68, "9": 0.653, "10": 0.626,
                "11": 0.599, "12": 0.572, "13": 0.545, "14": 0.518, "15": 0.491 },
        "5.5": { "1": 0.85, "2": 0.824, "3": 0.7985, "4": 0.774, "5": 0.75, "6": 0.723, "7": 0.6935, "8": 0.6665, "9": 0.6395, "10": 0.6125,
                "11": 0.5855, "12": 0.5585, "13": 0.5315, "14": 0.5045, "15": 0.4775 },
        "5": { "1": 0.837, "2": 0.811, "3": 0.786, "4": 0.762, "5": 0.739, "6": 0.707, "7": 0.68, "8": 0.653, "9": 0.626, "10": 0.599,
                "11": 0.572, "12": 0.545, "13": 0.518, "14": 0.491, "15": 0.464 },
        "4.5": { "1": 0.824, "2": 0.7985, "3": 0.774, "4": 0.75, "5": 0.723, "6": 0.6935, "7": 0.6665, "8": 0.6395, "9": 0.6125, "10": 0.5855,
                "11": 0.5585, "12": 0.5315, "13": 0.5045, "14": 0.4775, "15": 0.4505 },
        "4": { "1": 0.811, "2": 0.786, "3": 0.762, "4": 0.739, "5": 0.707, "6": 0.68, "7": 0.653, "8": 0.626, "9": 0.599, "10": 0.572,
                "11": 0.545, "12": 0.518, "13": 0.491, "14": 0.464, "15": 0.437 },
        "3.5": { "1": 0.7985, "2": 0.774, "3": 0.75, "4": 0.723, "5": 0.6935, "6": 0.6665, "7": 0.6395, "8": 0.6125, "9": 0.5855, "10": 0.5585,
                "11": 0.5315, "12": 0.5045, "13": 0.4775, "14": 0.4505, "15": 0.4235 },
        "3": { "1": 0.786, "2": 0.762, "3": 0.739, "4": 0.707, "5": 0.68, "6": 0.653, "7": 0.626, "8": 0.599, "9": 0.572, "10": 0.545,
                "11": 0.518, "12": 0.491, "13": 0.464, "14": 0.437, "15": 0.41 },
        "2.5": { "1": 0.774, "2": 0.75, "3": 0.723, "4": 0.6935, "5": 0.6665, "6": 0.6395, "7": 0.6125, "8": 0.5855, "9": 0.5585, "10": 0.5315,
                "11": 0.5045, "12": 0.4775, "13": 0.4505, "14": 0.4235, "15": 0.3965 },
        "2": { "1": 0.762, "2": 0.739, "3": 0.707, "4": 0.68, "5": 0.653, "6": 0.626, "7": 0.599, "8": 0.572, "9": 0.545, "10": 0.518,
                "11": 0.491, "12": 0.464, "13": 0.437, "14": 0.41, "15": 0.383 },
        "1.5": { "1": 0.75, "2": 0.723, "3": 0.6935, "4": 0.6665, "5": 0.6395, "6": 0.6125, "7": 0.5855, "8": 0.5585, "9": 0.5315, "10": 0.5045,
                "11": 0.4775, "12": 0.4505, "13": 0.4235, "14": 0.3965, "15": 0.3695 },
        "1": { "1": 0.739, "2": 0.707, "3": 0.68, "4": 0.653, "5": 0.626, "6": 0.599, "7": 0.572, "8": 0.545, "9": 0.518, "10": 0.491,
                "11": 0.464, "12": 0.437, "13": 0.41, "14": 0.383, "15": 0.356 },
        "0.5": { "1": 0.726, "2": 0.6935, "3": 0.6665, "4": 0.6395, "5": 0.6125, "6": 0.5855, "7": 0.5585, "8": 0.5315, "9": 0.5045, "10": 0.4775,
                "11": 0.4505, "12": 0.4235, "13": 0.3965, "14": 0.3695, "15": 0.3425 },
        "0": {"1": 0.707, "2": 0.68, "3": 0.653, "4": 0.626, "5": 0.599, "6": 0.572, "7": 0.545, "8": 0.518, "9": 0.491, "10": 0.464,
                "11": 0.437, "12": 0.41, "13": 0.383, "14": 0.356, "15": 0.329 }
    };
    
    

    const weightToLoad = max * multipliers[rpe][reps];

    document.getElementById("ResultWeight").value = weightToLoad.toFixed(2);
}
