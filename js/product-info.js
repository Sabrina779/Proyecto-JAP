var product = [];
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productCost = document.getElementById("productCost");
const productCategory = document.getElementById("productCategory");
const productSoltCount = document.getElementById("productSoldCount");

document.addEventListener("DOMContentLoaded", function(e) {

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            showProduct(product)

        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data
            showComments(comments)
        }

    });

    function showProduct(product) {
        productName.innerHTML = product.name
        productCost.innerHTML = product.currency + " " + product.cost
        productDescription.innerHTML = product.description
        productCategory.innerHTML = product.category
        productSoldCount.innerHTML = product.soldCount
    }

    function makeRaiting(starsOn) {
        let raiting = ""
        let starsOff = 5 - starsOn;
        let stars = starsOff + starsOn;
        for (let i = 0; i < starsOn; i++) { raiting += `<span class="fa fa-star checked" style="color: #FFD700"></span>` }
        for (let i = 0; i < starsOff; i++) { raiting += `<span class="fa fa-star" style="color: #78771b"></span>` }
        return raiting;
    }

    function lastBar(numbercomments, i) {
        if (numbercomments - 1 != i) {
            return "<hr>"
        } else {
            return `<hr style ="border-color: black;">`
        }
    }

    function showComments(comments) {

        let htmlContentToAppend = "";
        for (let i = 0; i < comments.length; i++) {
            let comment = comments[i];

            htmlContentToAppend += `
            <div class="media">
                <img class="align-self-center mr-3" src="./img/logo-ceibal.png" width="100" height="100">
                <div class="media-body">
                    <div class="container">
                        <div class="row">
                        <div class="col-sm">
                        <p class="font-weight-bold">${comment.user} </p>
                        </div>
                        <div class="col-sm">
                        <p class="font-weight-bold text-center"> Raiting: ${makeRaiting(comment.score)} </p>
                        </div>
                        </div>
                    </div>
                    <p>  ${comment.description} </p>
                    <p class="mb-0 font-italic">${comment.dateTime} </p>
                </div>
            </div>
            ${lastBar(comments.length, i)}
            `
            document.getElementById("comment-list-container").innerHTML = htmlContentToAppend;
        }
    }
    document.getElementById("commentSend").addEventListener("click", function(e) {
        e.preventDefault();
        var comment = {}
        var commentUser = document.getElementById("commentText").value

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime2 = date + ' ' + time;

        var userNamee = localStorage.getItem('email');

        const checkboxes = document.querySelectorAll(`input[name="inlineRadioOptions"]:checked`);
        let valueStars = [];
        checkboxes.forEach((checkbox) => { valueStars.push(checkbox.value) });

        comment = { score: valueStars, description: commentUser, user: userNamee, dateTime: dateTime2 }
        comments.push(comment)
        showComments(comments)
        document.getElementById("commentText").value = ""
    });

});