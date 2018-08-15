<template>
  <div id="myRBT">
    <vue-file-upload url='upload.do' ref="vueFileUploader" v-bind:filters = "filters" v-bind:events = 'cbEvents' v-bind:request-options = "reqopts" v-on:onAdd = "onAddItem">
      <span slot="label"> 选择文件</span>
    </vue-file-upload>
    <table>
      <thead>
      <tr>
        <th>预览</th>
        <th>name</th>
        <th>size</th>
        <th>progress</th>
        <th>status</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for='file in files'>
        <td >
          <video class="video" :src="file.src" controls="controls"></video>
        </td>
        <td v-text='file.nFile.name'></td>
        <td v-text='file.nFile.size'></td>
        <td v-text='file.nFile.progress'></td>
        <td v-text='onStatus(file.nFile)'></td>
        <td>
          <button type='button' @click="uploadItem(file.nFile)">上传</button>
          <button type='button' @click="uploadAll">上传所有文件</button>
          <button type='button' @click="clearAll">清空文件列表</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import VueFileUpload from 'vue-file-upload';
  export default{
    data(){
      return{
        files:[],
        nFiles:[],
        //文件过滤器，只能上传 支持'3gp','rmvb','flv','wmv','avi','mkv','mp4','mp3','wav'格式
        filters:[

          {
            name:"imageFilter",
            fn(file){

              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              console.log(type)
              if('|3gp|rmvb|avi|rm|mp4|'.indexOf(type) !== -1){
                console.log(file)

                return file
              }else {
                alert("只能上传视频")
              }

            }
          }
        ],
        //回调函数绑定
        cbEvents:{
          onCompleteUpload:(file,response,status,header)=>{
            console.log(file);
            console.log("finish upload;")
          }
        },
        //xhr请求附带参数
        reqopts:{
          formData:{
            tokens:'tttttttttttttt'
          },
          responseType:'json',
          withCredentials:false
        }
      }
    },
    mounted(){
      //设置formData数据
      this.$refs.vueFileUploader.setFormDataItem('authorization',"123");
    },
    methods:{
      onStatus(file){
        if(file.isSuccess){
          return "上传成功";
        }else if(file.isError){
          return "上传失败";
        }else if(file.isUploading){
          return "正在上传";
        }else{
          return "待上传";
        }
      },
      onAddItem(files){
        console.log(files);
        let _this=this;
        _this.nFiles=[];
        var leng=files.length;
        for(let i=0;i<leng;i++){
          let reader = new FileReader();
          reader.readAsDataURL(files[i].file);
          reader.onload =function(e){
            // for(var i=0;i<leng;i++){

            _this.nFiles.push({
              nFile:files[i],
              src:e.target.result
            })
          }
          // };
        }
        console.log(this.nFiles)
        this.files = this.nFiles;

      },
      uploadItem(file){
        //单个文件上传
        file.upload();
      },
      uploadAll(){
        //上传所有文件
        this.$refs.vueFileUploader.uploadAll();
      },
      clearAll(){
        //清空所有文件
        this.$refs.vueFileUploader.clearAll();
      }
    },
    components:{
      VueFileUpload
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
