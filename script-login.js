// script-login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // ป้องกันการรีเฟรชหน้า

            const emailInput = document.getElementById('username'); // ใช้ช่อง username สำหรับกรอก email
            const passwordInput = document.getElementById('password');

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (email === '' || password === '') {
                alert('กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน');
                return;
            }

            // --- เริ่มการเชื่อมต่อกับ Firebase Authentication ---
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // ล็อกอินสำเร็จ
                    console.log('Signed in successfully!', userCredential.user);
                    alert(`ยินดีต้อนรับ, ${userCredential.user.email}!`);
                    
                    // เมื่อสำเร็จ ให้ไปที่หน้า portfolio หลัก
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    // เกิดข้อผิดพลาดในการล็อกอิน
                    console.error('Login Error:', error.code, error.message);
                    
                    // แปลง error code เป็นข้อความภาษาไทยที่เข้าใจง่าย
                    let errorMessage = '';
                    switch (error.code) {
                        case 'auth/user-not-found':
                            errorMessage = 'ไม่พบผู้ใช้อีเมลนี้ในระบบ';
                            break;
                        case 'auth/wrong-password':
                            errorMessage = 'รหัสผ่านไม่ถูกต้อง';
                            break;
                        case 'auth/invalid-email':
                            errorMessage = 'รูปแบบอีเมลไม่ถูกต้อง';
                            break;
                        default:
                            errorMessage = 'เกิดข้อผิดพลาดในการล็อกอิน กรุณาลองใหม่อีกครั้ง';
                    }
                    alert(errorMessage);
                });
            // --- จบการเชื่อมต่อ ---
        });
    }
});
