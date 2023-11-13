<template>
    <div>
        <div class="header">
            <el-row>
                <el-col :span="12" style="text-align: left;font-weight: bold;color: blue;font-size: 25px;">体检报告管理系统</el-col>
                <el-col :span="12" style="text-align: right;">医生：{{ this.$store.state.Doctor.realname }}</el-col>
              </el-row>
        </div>

        <div class="common-layout">
            <el-container>
            <el-aside width="300px" style="background-color: #cdc7c7;height: 800px;">
                <div>
                    <el-form ref="doctorForm" :model="doctorForm"  class="register-form">
                        <h2 class="register-title">预约客户信息</h2>

                        <el-row>
                            <el-col :span="12">手机号码：</el-col>
                            <el-col :span="12">{{ doctorForm.userid }}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">姓名：</el-col>
                            <el-col :span="12">{{ doctorForm.realname }}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">性别：</el-col>
                            <el-col :span="12">{{ doctorForm.sex }}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">套餐类型：</el-col>
                            <el-col :span="12"> {{ doctorForm.type == 1 ? '男士套餐' : '女士套餐' }}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">体检日期：</el-col>
                            <el-col :span="12">{{ doctorForm.orderdate }}</el-col>
                        </el-row>
                   


                        <el-form-item>
                        
                        <el-button type="primary" @click="jump">查询体验用户</el-button>
                        
                       
                        </el-form-item>
                    </el-form>
                </div>
            </el-aside>



            <el-main>
                <div>
                   <div v-for="item in checkitem">
                    <el-form :model="item" label-width="120px">
                        <h3 style="text-align: left;">{{ item.ciname }}</h3>
                        <div v-for="ci in item.cidetailedreportList">
                            <el-row :gutter="24">
                                <el-col :span="10">
                                    <p style="text-align: left ;">
                                        
                                        {{ ci.name }}
                                    </p>
                                </el-col>
                                <el-col :span="10" style="text-align: left;">
                                   
                                    <!-- <el-input v-model="ci.value" /> -->
                                    <span style="color: #FFF;background-color: coral;" v-if="ci.iserror === 1">异</span>
                                        {{ ci.name }}
                                    <input v-model="ci.value" />
                                    {{ ci.unit }}
                                     <br>
                                    <span style="font-size: 13px;">正常值范围：
                                        <span v-if="ci.type===3">无需验证</span>
                                        <span v-if="ci.type===4">{{ ci.normalValueString }}</span>
                                        <span v-if="ci.type===1">
                                            {{ ci.minrange }} ~  {{ ci.maxrange }}
                                        </span>
                                        <span v-if="ci.type===2">
                                            {{ ci.minrange }} =  {{ ci.maxrange }}
                                        </span>
                                    
                                    </span>
                                </el-col>
                                <el-col :span="4" style="text-align: left;">
                                    <el-button type="primary" plain @click="saveCi(ci)">保存</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-form>
                   </div>



                   <div>
                     <h2 style="text-align: left;">总结结论</h2>
                     <el-button type="primary" plain @click="updateOrder()">保存归档</el-button>
                     <el-table :data="Oberallresult" style="width: 100%">
                        <el-table-column prop="orld" label="编号" width="180" />
                        <el-table-column prop="title" label="标题" width="180" />
                        <el-table-column prop="content" label="内容" />
                        <el-table-column prop="" label="操作" >
                            <template #default="scope">
                            
                             <el-button type="primary" plain @click="deleteOb(scope.row)">删除</el-button>
                             </template>
                        </el-table-column>
                        
                    </el-table>

                    <el-row :gutter="20" style="padding: 10px;">
                        <el-col :span="6">
                            总结结论标题:
                        </el-col>
                       
                        <el-col :span="12">
                            <el-input v-model="title" />
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            总结结论项内容:
                        </el-col>
                       
                        <el-col :span="12">
                            <el-input v-model="content" type="textarea"/>
                        </el-col>
                    </el-row>
                    <div style="padding: 10px;">
                        <el-button type="primary" plain @click="addOb()">添加</el-button>
                    </div>

                   </div>

                </div>
            </el-main>
            </el-container>
        </div>
        
    
   

       
    </div>
</template>



<script>
import axios from '@/axios';

    export default {
        name: '',
        data() {
            return{
                doctorForm: {
                    userid: '',    
                    realname: '',
                    sex: '',
                    type: '',
                    orderdate: '',
                    orderid: '',
                    state: '',
                    rows: 10,
                    page: 1
                },
                orderList: [],
                doctor: '',
                checkitem: '',
                Oberallresult: [],
                title: '',
                content: '',
            }
        },
        methods: {
            goBack() {
            // 返回上一页的逻辑
            // 可以使用浏览器的 history API 或路由的 go 方法实现返回上一页
            // 例如：this.$router.go(-1) 或 window.history.back()
             this.$router.go(-1)
            },
            jump() {
                this.$router.push({
                    path: '/tjbg'
                });
            },
            edit(row) {
                console.log(row.hpName)
            },
            formatDate2(dateStr) {
                const date = new Date(dateStr);

                // 使用辅助函数获取年、月、日、时、分、秒
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                // 根据需要的格式拼接时间字符串
                const formattedDate = `${year}-${month}-${day}`;

                return formattedDate;
            },
            updateOrder() {
                let req = {}
                req.orderid = this.doctorForm.orderid
                req.state = 2
                axios({
                    url: '/doctor/updateOrder',
                    method: 'post',
                    data: req
                }).then(res => {
                    alert('归档成功')
                }).catch(e => {
                    console.log(e)
                })
            },
            saveCi(data) {
         
                if (data.type==1) {
                    if (data.value >= data.minrange && data.value <= data.maxrange) {
                        data.iserror = 0
                        // console.log(data.iserror)
                    } else {
                        data.iserror = 1
                    }
                }
                if (data.type == 2) {
                    
                    if (data.value == data.maxrange) {
                        data.iserror = 0
                        // console.log(data.iserror)
                    } else {
                        data.iserror = 1
                    }
                    
                }
                for (let i in this.checkitem) {
                    let c = this.checkitem[i];
                    for (let j in c.cidetailedreportList) {
                        let cide = c.cidetailedreportList[j];
                        if (cide.cidrid === data.cidrid) {
                            // cide = data.iserror
                            this.checkitem[i].cidetailedreportList[j].iserror = data.iserror
                           
                            break
                        }
                        
                        
                    }
                }
                axios({
                    url: '/doctor/save',
                    method: 'post',
                    data: data
                }).then(res => {
                    alert('保存成功')
                }).catch(e => {
                    console.log(e)
                })
            },
            addOb() {
                let req = {}
                req.content = this.content
                req.title = this.title
                req.orderid = this.doctorForm.orderid
                axios({
                    url: '/doctor/add',
                    method: 'post',
                    data: req
                }).then(res => {
                    alert('添加结论成功')
                    this.selectOb()
                    this.title = ''
                    this.content = ''
                }).catch(e => {
                    console.log(e)
                })
            },
            deleteOb(row) {
                // console.log(111)
                axios({
                    url: '/doctor/delete',
                    method: 'post',
                    data: row
                }).then(res => {
                    alert('删除成功')
                
                    let id = this.Oberallresult.findIndex(item => {
                        if (item.orld == row.rold) {
                            return true
                        }
                    })
                    this.Oberallresult.splice(id, 1)
                   
                }).catch(e => {
                    console.log(e)
                })
            },
            clear() {
                this.doctorForm.userid=''   
                this.doctorForm.realname= ''
                this.doctorForm.sex= ''
                this.doctorForm.type= ''
                this.doctorForm.orderdate= ''
                
                this.doctorForm.state= '';
                this.doctorForm.page= 1; 
                this.doctorForm.rows= 10;
            },
            selectOb() {
                let req = {}
                req.orderid = this.doctorForm.orderid
                axios({
                    url: '/doctor/list',
                    method: 'post',
                    data: req
                }).then(res => {
                    // console.log(res.data.data)
                    this.Oberallresult = res.data.data
                }).catch(e => {
                    console.log(e)
                })
            }
            
          
           
        },
         mounted() {

          
            this.doctor = this.$store.state.Doctor
            console.log(this.doctor)
            console.log(111111111111)

            this.doctorForm.userid = this.$route.query.userid
            this.doctorForm.realname = this.$route.query.realname
            this.doctorForm.sex = this.$route.query.sex
            this.doctorForm.orderdate = this.$route.query.orderdate
            this.doctorForm.state = this.$route.query.state
            this.doctorForm.type = this.$route.query.type
            this.doctorForm.orderid = this.$route.query.orderid
            let req = {}
            req.orderld = this.doctorForm.orderid
            axios({
                url: '/doctor/listCideByOrderId',
                method: 'post',
                data: req
            }).then(res => {
                // console.log(res.data.data)
                this.checkitem = res.data.data
            }).catch(e => {
                console.log(e)
            })

            this.selectOb()
            
        },
    
}
</script>


<style>
.header {
 
  padding: 13px;
  background-color: #f0f0f0;
}
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}



</style>