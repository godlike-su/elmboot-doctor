<template>
    <div>
        <div class="header">
            <el-row>
                <el-col :span="12" style="text-align: left;font-weight: bold;color: blue;font-size: 25px;">体检报告管理系统</el-col>
                <el-col :span="12" style="text-align: right;">医生：{{ doctor.realname }}</el-col>
              </el-row>
        </div>

        <div class="common-layout">
            <el-container>
            <el-aside width="300px" style="background-color: #cdc7c7;height: 800px;">
                <div>
                    <el-form ref="doctorForm" :model="doctorForm"  class="register-form">
                        <h2 class="register-title">体检客户查询</h2>
                        <el-form-item prop="userid" label="手机号码：">
                        <el-input v-model="doctorForm.userid" placeholder="手机号码"></el-input>
                        </el-form-item>
                        <el-form-item prop="realname" label="姓名：">
                        <el-input v-model="doctorForm.realname" placeholder="姓名"></el-input>
                        </el-form-item>
                        <el-form-item prop="sex" label="性别：">
                        <el-radio-group v-model="doctorForm.sex">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="0">女</el-radio>
                        </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="identitycard" label="套餐类型：">
                            <el-select v-model="doctorForm.type" placeholder="套餐类型">
                                <el-option label="男士套餐" value="1" />
                                <el-option label="女士套餐" value="0" />
                            </el-select>
                      
                        </el-form-item>
                        <el-form-item prop="birthday" label="体检日期：">
                        <el-date-picker v-model="doctorForm.orderdate" type="date" placeholder="体检日期"></el-date-picker>
                        </el-form-item>

                        <el-form-item prop="state" label="是否归档：">
                        <el-radio-group v-model="doctorForm.state">
                            <el-radio label="1">未归档</el-radio>
                            <el-radio label="2">已归档</el-radio>
                        </el-radio-group>
                        </el-form-item>


                        <el-form-item>
                        
                        <el-button type="primary" @click="select">查询</el-button>
                        <el-button @click="clear">重制</el-button>
                       
                        </el-form-item>
                    </el-form>
                </div>
            </el-aside>



            <el-main>
                <div>
                    <el-table :data="orderList" border style="width: 100%">
                        <el-table-column prop="orderid" label="预约编号" width="100" />
                        <el-table-column prop="userid" label="手机号码" width="120" />
                        <el-table-column prop="realname" label="真实姓名" width="120" />
                        <el-table-column prop="sex" label="性别" width="80" />
                        <el-table-column prop="type" label="体检套餐类型" width="180" >
                            <template #default="scope">
                                {{ scope.row.type == 1 ? '男士套餐' : '女士套餐' }}
                             </template>
                        </el-table-column>
                        <el-table-column prop="hpName" label="体检医院" width="200" />
                        <el-table-column prop="orderdate" label="体检日期" width="200" />
                      
                        <el-table-column prop="" label="操作" >
                            <template #default="scope">
                             <el-button type="primary" plain @click="edit(scope.row)">编辑体检报告</el-button>
                             </template>
                        </el-table-column>
                    </el-table>
                    <div class="example-pagination-block">
                        <el-button type="primary" plain @click="up()">上一页</el-button>
                        <el-button type="primary" plain @click="down()">下一页</el-button>
                        当前页：{{ doctorForm.page }}
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
                    region: '',
                    state: '',
                    rows: 10,
                    page: 1
                },
                orderList: [],
                doctor: '',
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
                
            },
            edit(row) {
                console.log(row.hpName)
                this.$router.push({
                    path: '/bjtjbg',
                    query: {orderid: row.orderid
                        , userid: row.userid
                        ,  realname: row.realname
                        ,  orderdate: row.orderdate
                        , state: row.state,
                        type : row.type
                        , sex: row.sex
                    }
                });
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
            select() {
                // console.log(this.doctorForm)
                axios({
                    url: '/doctor/getDoctorOrderList',
                    method: 'post',
                    data: this.doctorForm
                }).then(res => {
                    console.log(res.data);
                    
                   this.orderList = res.data.data
                   for (let index in this.orderList) {
                    let order = this.orderList[index] 
                    if (order.sex == '1') {
                        order.sex = '男'
                    } else if (order.sex == '0') {
                        order.sex = '女'
                    }
                   
                    order.orderdate = this.formatDate2(order.orderdate);
                 }
                    
                   
                    
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
            up() {
                if (this.doctorForm.page != 1) {
                    this.doctorForm.page = this.doctorForm.page - 1
                    // console.log(this.doctorForm.page)
                    this.select()
                }
            }, 
            down() {
              
                this.doctorForm.page = this.doctorForm.page + 1
                this.select()
               
            },
          
           
        },
         mounted() {
            this.select()
            axios({
                url: '/doctor/getDoctorMe',
                method: 'post',
                data: null
            }).then(res => {
              
                
                this.doctor = res.data.data
                
                this.$store.commit('setDoctor', this.doctor)
              
                
                
                
            }).catch(e => {
                console.log(e)
            })
            
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