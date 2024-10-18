const slangDictionary = {
    "딸배" : "배달사원을 비하하는 말",
    "낄끼빠빠" : "낄 때 끼고 빠질 때 빠져",
    "답정너" : "답은 정해져 있고 너는 대답만 해",
    "취존" : "취향 존중",
    "케바케" : "케이스 바이 케이스; Case by Case",
    "자만추" : "자연스러운 만남 추구",
    "정뚝떨" : "정이 뚝 떨어진다",
    "핑프" : "핑거 프린세스",
    "하남자" : "자신감이 없다 라는 뜻으로 ( 상남자 <=> 하남자 )",
    "사바사" : "사람 By 사람",
    "마해자" : "마스크로 인해 미모가 가려진 사람.",
    "오저치고" : "오늘 저녁 치킨 Go?",
    "스카" : "스터디 카페",
    "중꺾마" : "중요한건 꺾이지 않는 마음",
    "무물보" : "무엇이든 물어보세요",
    "MZ세대" : "1981년 부터 2010년에 출생한 세대를 가르키는 용어",
    "상사병" : "상사 때문에 얻은 홧병",
    "내또출" : "내일 또 출근",
    "분조장" : "분노 조절 장애",
    "조삼모사" : "조금 모르면 3번 진짜 모르면 4번",
    "오히려 좋아" : "안좋은 상황이지만 긍정적으로 생각하는 것",
    "오운완" : "오늘 운동 완료",
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
function levenshtein(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1  // deletion
                    )
                );
            }
        }
    }
    return matrix[b.length][a.length];
}
// 유사 단어 검색 (일치율 필터 추가)
function findSimilarWords(input) {
    const threshold = 2;  // 편집 거리 임계값
    const similarityThreshold = 0.5;  // 최소 일치율 50%
    const similarWords = [];

    for (const word in slangDictionary) {
        const distance = levenshtein(input, word);
        const similarity = 1 - (distance / Math.max(input.length, word.length));  // 일치율 계산

        // 편집 거리와 일치율을 모두 고려
        if (distance <= threshold && similarity >= similarityThreshold) {
            similarWords.push(word);
        }
    }
    return similarWords;
}
// 신조어 검색 처리
document.getElementById('search-button').addEventListener('click', function() {
    const keyword = document.getElementById('keyword').value.trim();
    const resultDiv = document.getElementById('result');

    if (keyword in slangDictionary) {
        resultDiv.innerText = `${keyword}: ${slangDictionary[keyword]}`;
    } else {
        const similarWords = findSimilarWords(keyword);
        if (similarWords.length > 0) {
            resultDiv.innerText = `찾고자 하는 신조어는 없지만, 비슷한 신조어: ${similarWords.join(', ')}`;
        } else {
            resultDiv.innerText = '신조어를 찾을 수 없습니다.';
        }
    }

    document.getElementById('keyword').value = ''; // 검색 후 입력란 초기화
});