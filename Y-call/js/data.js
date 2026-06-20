const CATEGORIES = [
  { id: 'legal',    name: '법률',     emoji: '⚖️',  count: 234 },
  { id: 'medical',  name: '의료/건강', emoji: '🏥', count: 189 },
  { id: 'finance',  name: '금융/세무', emoji: '💰', count: 312 },
  { id: 'it',       name: 'IT/개발',  emoji: '💻',  count: 428 },
  { id: 'realty',   name: '부동산',   emoji: '🏢',  count: 156 },
  { id: 'psych',    name: '심리상담', emoji: '🧠',  count: 203 },
  { id: 'business', name: '경영/창업', emoji: '📊', count: 175 },
  { id: 'edu',      name: '육아/교육', emoji: '📚', count: 267 },
];

const EXPERTS = [
  {
    id: 1,
    name: '김민준',
    initials: '김',
    title: '법무법인 소속 변호사',
    category: 'legal',
    categoryName: '법률',
    tags: ['계약서 검토', '분쟁 해결', '기업법무'],
    rating: 4.9,
    reviewCount: 342,
    callCount: 1820,
    pricePerMin: 2000,
    isOnline: true,
    isCertified: true,
    bio: '10년 경력의 기업법무 전문 변호사입니다. 계약 검토, 분쟁 조정, 법인 설립 등 폭넓은 법률 서비스를 제공합니다. 복잡한 법률 문제를 쉽고 명확하게 설명해드립니다.',
    career: ['법무법인 태평양 5년', '삼성전자 법무팀 3년', '대한변협 등록 변호사'],
    education: ['서울대학교 법학 학사', '사법연수원 40기'],
    responseTime: '평균 2분',
    availableSlots: ['09:00', '10:00', '14:00', '15:00', '16:00'],
  },
  {
    id: 2,
    name: '이서연',
    initials: '이',
    title: '공인 세무사 / 세무회계 전문',
    category: 'finance',
    categoryName: '금융/세무',
    tags: ['세금 절세', '종합소득세', '법인세'],
    rating: 4.8,
    reviewCount: 521,
    callCount: 2340,
    pricePerMin: 1500,
    isOnline: true,
    isCertified: true,
    bio: '개인사업자, 법인 세무신고부터 절세 컨설팅까지 전문적인 세무 서비스를 제공합니다. 국세청 7년 근무 경험을 바탕으로 정확하고 신뢰할 수 있는 조언을 드립니다.',
    career: ['국세청 7년 근무', '세무법인 대표', '중소기업 세무 자문 10년'],
    education: ['연세대학교 경영학 학사', '공인세무사 자격'],
    responseTime: '평균 1분',
    availableSlots: ['09:00', '11:00', '13:00', '14:00', '17:00'],
  },
  {
    id: 3,
    name: '박준혁',
    initials: '박',
    title: '풀스택 개발자 / CTO 출신',
    category: 'it',
    categoryName: 'IT/개발',
    tags: ['스타트업 기술', 'React/Node', '아키텍처'],
    rating: 4.9,
    reviewCount: 289,
    callCount: 1540,
    pricePerMin: 1800,
    isOnline: false,
    isCertified: true,
    bio: '스타트업 CTO 경험이 있는 풀스택 개발자입니다. 서비스 아키텍처 설계, 기술 스택 선택, 개발팀 운영 등 기술적 의사결정을 도와드립니다.',
    career: ['스타트업 CTO 5년', '네이버 개발자 3년', '프리랜서 컨설턴트'],
    education: ['KAIST 컴퓨터공학 학사', 'AWS 솔루션 아키텍트'],
    responseTime: '평균 5분',
    availableSlots: ['10:00', '13:00', '15:00', '18:00', '20:00'],
  },
  {
    id: 4,
    name: '최지은',
    initials: '최',
    title: '임상심리사 / 상담 전문가',
    category: 'psych',
    categoryName: '심리상담',
    tags: ['불안/우울', '관계 상담', '진로 상담'],
    rating: 5.0,
    reviewCount: 198,
    callCount: 876,
    pricePerMin: 2500,
    isOnline: true,
    isCertified: true,
    bio: '임상심리사 자격을 보유한 상담 전문가입니다. 불안, 우울, 관계 문제, 진로 고민 등 다양한 심리적 어려움에 대해 전문적이고 따뜻한 상담을 제공합니다.',
    career: ['국립정신건강센터 3년', '개인상담소 운영 5년', '기업 EAP 상담사'],
    education: ['이화여대 심리학 석사', '임상심리사 1급 자격'],
    responseTime: '평균 3분',
    availableSlots: ['10:00', '11:00', '14:00', '15:00', '16:00'],
  },
  {
    id: 5,
    name: '정대호',
    initials: '정',
    title: '공인중개사 / 부동산 투자 전문',
    category: 'realty',
    categoryName: '부동산',
    tags: ['아파트 매매', '전세 계약', '투자 분석'],
    rating: 4.7,
    reviewCount: 413,
    callCount: 2100,
    pricePerMin: 1200,
    isOnline: true,
    isCertified: false,
    bio: '20년 경력의 공인중개사로 강남·서초·마포 지역 전문입니다. 매매, 전월세, 투자 분석까지 부동산 관련 모든 고민을 해결해드립니다.',
    career: ['공인중개사 20년', '부동산 투자 컨설턴트', '부동산 유튜버 10만 구독'],
    education: ['공인중개사 자격', '부동산학과 학사'],
    responseTime: '평균 2분',
    availableSlots: ['09:00', '10:00', '11:00', '13:00', '14:00'],
  },
  {
    id: 6,
    name: '한소희',
    initials: '한',
    title: '소아과 전문의 / 육아 상담',
    category: 'medical',
    categoryName: '의료/건강',
    tags: ['소아 발달', '예방접종', '식이/수면'],
    rating: 4.9,
    reviewCount: 672,
    callCount: 3210,
    pricePerMin: 3000,
    isOnline: false,
    isCertified: true,
    bio: '소아청소년과 전문의로서 아이 건강에 대한 정확한 의료 정보와 육아 조언을 드립니다. 발달, 영양, 수면, 예방접종 등 부모님의 걱정을 함께 해결합니다.',
    career: ['서울아산병원 소아과 5년', '개인 클리닉 원장 8년', '보건복지부 자문위원'],
    education: ['서울대학교 의과대학', '소아청소년과 전문의'],
    responseTime: '평균 4분',
    availableSlots: ['09:00', '10:00', '14:00', '15:00'],
  },
];

const REVIEWS = [
  { id: 1, expertId: 1, userName: '박**', rating: 5, date: '2026-06-10', comment: '법률 문제가 너무 복잡해서 막막했는데, 김민준 변호사님이 명확하게 설명해주셔서 이해하기 쉬웠습니다. 적극 추천합니다!', callMinutes: 15 },
  { id: 2, expertId: 1, userName: '이**', rating: 5, date: '2026-06-08', comment: '계약서 검토를 맡겼는데 꼼꼼하게 문제점을 찾아주셨어요. 덕분에 큰 피해를 예방할 수 있었습니다.', callMinutes: 20 },
  { id: 3, expertId: 1, userName: '최**', rating: 4, date: '2026-06-05', comment: '전문적이고 친절한 상담이었습니다. 다음에 또 이용하겠습니다.', callMinutes: 10 },
  { id: 4, expertId: 2, userName: '김**', rating: 5, date: '2026-06-12', comment: '세금 문제로 걱정이 많았는데 이서연 세무사님 덕분에 절세 방법을 알게 되었습니다.', callMinutes: 25 },
  { id: 5, expertId: 3, userName: '장**', rating: 5, date: '2026-06-09', comment: '기술 스택 선택에 대해 명확한 가이드를 받았습니다. 실무 경험이 풍부하신 분이라 믿음직스러웠습니다.', callMinutes: 30 },
];

function getExpertById(id) {
  return EXPERTS.find(e => e.id === parseInt(id));
}

function getReviewsByExpertId(expertId) {
  return REVIEWS.filter(r => r.expertId === parseInt(expertId));
}

function getExpertsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return EXPERTS;
  return EXPERTS.filter(e => e.category === categoryId);
}

function formatPrice(price) {
  return price.toLocaleString('ko-KR') + '원';
}

function formatRating(rating) {
  return rating.toFixed(1);
}
