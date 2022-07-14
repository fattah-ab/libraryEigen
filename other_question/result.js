// 1. reverse string
function reverseString(str) {
    var newString = "";

    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    };

    let letter = newString.charAt(0);
    let str1 = newString.substring(1);

    newString = str1 + letter;
    return newString;
}

console.log("reverse string : ", reverseString('NEGIE1'));


// 2. find longest word of given string
function longest(string) {
    let dataSplit = string.split(" ");

    var long = dataSplit.reduce(
        function (a, b) {
            return a.length > b.length ? a : b;
        }
    );
    return long
}

const sentence = "Saya sangat senang mengerjakan soal algoritma"
console.log("find longest string of given sentence : ", longest(sentence))


// 3. find duplicates
function duplicates(array1, array2) {
    tempDuplicates = [];

    for (let i = 0; i < array2.length; i++) {
        for (let j = 0; j < array1.length; j++) {
            if (array1[j] === array2[i]) {
                tempDuplicates.push(array1[j]);
            }
        }
    }

    let result = []
    var counts = {};
    tempDuplicates.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
    });
    
    array2.forEach((y) => {
        if(y in counts){
            result.push(counts[y])
        } else {
            result.push(0)
        }
    })
    return result;
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
console.log("find duplicates : ", duplicates(INPUT, QUERY))


// 4. sum diagonal array
function diagonal(matrix) {
    let diagonal1 = matrix[0][0] + matrix[1][1] + matrix[2][2];
    let diagonal2 = matrix[0][2] + matrix[1][1] + matrix[2][0];

    let result = diagonal1 - diagonal2;
    return result;
}

let matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
console.log("sum diagonal matrix : ", diagonal(matrix))