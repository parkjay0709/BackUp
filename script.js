const slangDictionary = {
    "헐" : "놀라움이나 경악을 표현하는 감탄사.",
    "사바사" : "사람 by 사람의 줄임말로, 사람마다 다르다는 뜻.",
    "소확행" : "소소하지만 확실한 행복의 줄임말.",
    "혼코노" : "혼자서 코노(노래방)를 간다는 의미.",
    "짤" : "짤막한 이미지나 동영상을 의미하는 말.",
    // 추가적인 신조어와 정의를 여기에 추가할 수 있습니다.
};

// 회원가입 처리
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        document.getElementById('auth-message').innerText = '이미 존재하는 사용자 이름입니다.';
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('auth-message').innerText = '회원가입 성공! 로그인 해주세요.';
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
        document.getElementById('auth-message').innerText = '로그인 성공!';
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('search-section').classList.remove('hidden');
    } else {
        document.getElementById('auth-message').innerText = '사용자 이름 또는 비밀번호가 잘못되었습니다.';
    }

    document.getElementById('login-form').reset();
});

// 신조어 검색 처리
document.getElementById('search-button').addEventListener('click', function() {
    const keyword = document.getElementById('keyword').value.trim();
    const resultDiv = document.getElementById('result');

    if (keyword in slangDictionary) {
        resultDiv.innerText = `${keyword}: ${slangDictionary[keyword]}`;
    } else {
        resultDiv.innerText = '신조어를 찾을 수 없습니다.';
    }

    document.getElementById('keyword').value = ''; // 검색 후 입력란 초기화
});