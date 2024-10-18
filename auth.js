// 회원가입 처리
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        document.getElementById('message').innerText = '이미 존재하는 사용자 이름입니다.';
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('message').innerText = '회원가입 성공!';
        document.getElementById('signup-form').reset();
    }
});

// 로그인 처리
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username] === password) {
        document.getElementById('message').innerText = '로그인 성공!';
    } else {
        document.getElementById('message').innerText = '사용자 이름 또는 비밀번호가 잘못되었습니다.';
    }

    document.getElementById('login-form').reset();
});
