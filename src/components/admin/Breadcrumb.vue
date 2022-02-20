<template>
  <div>
    
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6" style="padding-left:0px">
              <h4 class="m-0">{{title}}</h4>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                <router-link :to="{ name: 'admin-dashboard' }">Home</router-link>
                </li>
                <li class="breadcrumb-item active">{{title}}</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->
  </div>
</template>

<script>
export default {
    name: "Breadcrumb",
    props:{
      title: String
    }
}
</script>
<style scoped>

</style>
