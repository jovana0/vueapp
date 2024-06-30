<template>
  <div id="author">
    <h3>Author</h3>
    <div class="card ms-5" style="max-width: 85%;">
        <div class="row g-0">
          <div class="col-md-3">
            <img src="../assets/img/ja.jpg" class="img-fluid rounded-start" alt="Jovana Davidovic">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">Jovana Davidović</h5>
              <p class="card-text"><small class="text-muted">111/22</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped>
h3{
  font-style: italic;
    color:#543310;
    margin-left:10px;
}
.card{
    background-color: transparent !important;
    color:#74512D !important;
    border: 0px;
}
.card-body {
  text-align: justify;
}

.img-fluid {
  object-fit: cover;
  height: 100%;
}
</style>