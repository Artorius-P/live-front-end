<template>
    <div>
    <el-container >
    <el-main style="position:absolute;height: 70%;width:100%;">
        <ul>
            <p v-for="i in messages" :key="i" style="text-align:left;  word-wrap:break-word;word-break:break-all;white-space:pre;">{{i.htm}}</p>
        </ul>
    </el-main>
    <el-footer style="position:absolute;bottom:0;width:100%;height:100px;">
        <el-row :gutter="20">
            <el-col :span="19">
                <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="textarea">
                </el-input>
            </el-col>

            <el-col :span="4">
                <el-button type="primary" @click="sendMessage">发送</el-button>
            </el-col>
        </el-row>
    </el-footer>
    </el-container>
    </div>
</template>


<script>
import io from "socket.io-client";
let socket = io('ws://localhost:5000/');

export default {
    data() {
        return {
            messages: [],
            textarea: '',
            users: []
        }
    },
    methods: {
        sendMessage() {
            socket.emit('cts', {room: this.$store.state.room.id, username: this.$store.state.loginInfo.username, 'message': this.textarea})
            this.textarea = ''
            console.log(this.messages)
        },
    },

    mounted() {
        socket.on('stc', data =>{
            
            if (!this.$store.state.chat) {
                this.$notify({
                title: data.username,
                message: this.$createElement('i', { style: 'color: teal'}, data.message)
                });
            }
            if (data.username === 'system') {
                data.username = '系统消息'
            }
            let msg = new String(data.username + ': \n' + data.message)
            data['htm'] = msg
            this.messages.push(data)
        });

        socket.on('at', data =>{
            console.log(data)
            if (data.at == this.$store.state.loginInfo.username) {
                this.$notify({
                    title: '提示',
                    message: data.username + '@了你。',
                    duration: 0
                    });
            }
        });
        socket.emit('join', {room: this.$store.state.room.id, username: this.$store.state.loginInfo.username})
    }
}
</script>

<style scoped>
    .msg-send {
          text-align: right;
    }
</style>