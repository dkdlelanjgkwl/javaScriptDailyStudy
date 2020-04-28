//
(function () {
  // select options
  const services = [
    {
      value: 0.2,
      title: 'great - 20%',
    },
    {
      value: 0.1,
      title: 'ok - 10%',
    },
    {
      value: 0.02,
      title: 'bad - 2%',
    },
  ];
  // error msg
  const errors = [
    { id: 'input-bill', msg: 'bill amount cannot be less than zero' },
    {
      id: 'input-users',
      msg: 'people sharing the bill cannot be less than zero',
    },
    { id: 'input-service', msg: 'service has to be selected' },
  ];

  const $form = document.querySelector('#tip-form');
  const $amount = $form.querySelector('#input-bill');
  const $users = $form.querySelector('#input-users');
  const $service = $form.querySelector('#input-service');

  const $feedback = document.querySelector('.feedback');

  const $results = document.querySelector('.results');
  const $tipAmount = $results.querySelector('#tip-amount');
  const $totalAmount = $results.querySelector('#total-amount');
  const $personAmount = $results.querySelector('#person-amount');

  const $loader = document.querySelector('.loader');

  const frag = new DocumentFragment();

  services.forEach((service) => {
    const $option = document.createElement('option');
    $option.setAttribute('value', service.value);
    $option.textContent = service.title;
    frag.appendChild($option);
  });
  $service.appendChild(frag);
  // submit btn 과 form 의 상관관계 정리
  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    // select element 와 option 상관관계 md 정리
    const inputValue = [$amount.value, $users.value, $service.value];
    console.log(inputValue);
    // some 함수로 사용법 (flag 평가..)
    const check = inputValue.some((value) => {
      return value === null || value === '' || value <= '0';
    });
    // showItem이 제거된 $feedback 요소의 p자식요소들을 전부다 삭제하는 과정
    removeChildNodes($feedback);
    removeChildNodes($tipAmount);
    removeChildNodes($personAmount);
    removeChildNodes($totalAmount);

    if (check) {
      const validate = [$amount, $users, $service].filter(($el) => {
        return $el.value === null || $el.value === '' || $el.value <= '0';
      });

      // 중첩함수에서 변수 스코프 헷갈리니깐 md 정리
      validate.forEach(($el) => {
        const $p = document.createElement('p');
        errors.forEach((error) => {
          if ($el.id === error.id) {
            $p.textContent = error.msg;
            frag.appendChild($p);
          }
        });
      });
      // showItem 하고 frag appendChild
      $feedback.classList.add('showItem', 'alert-danger');
      $feedback.appendChild(frag);
    } else {
      $feedback.classList.remove('alert-danger');
      $feedback.classList.add('showItem', 'alert-success');
      $loader.classList.add('showItem');

      const $p = document.createElement('p');
      $p.textContent = 'Calculating...';
      $feedback.appendChild($p);

      // const billAmount = parseInt($amount.value);
      // const person = parseInt($users.value);
      // let service = parseInt($service.value);

      // 타이머 함수의 호출시기. md정리
      setTimeout(() => {
        $feedback.classList.remove('showItem', 'alert-success');
        $loader.classList.remove('showItem');

        showResult(...inputValue);
        $form.reset();
      }, 3000);
    }
  });

  function removeChildNodes(elementNode) {
    // nodelist와 htmlcollection은 이터러블이지만 배열은 아니다
    // 상위 prototype은 object임
    const childNodes = [...elementNode.childNodes];
    childNodes.forEach((childNode) => {
      if (childNodes.length >= 0) elementNode.removeChild(childNode);
    });
  }
  function showResult(bill, person, service) {
    const tip = parseInt(bill) * parseFloat(service);
    const total = tip + parseInt(bill);
    const user = total / parseInt(person);

    $tipAmount.textContent = tip.toFixed(2);
    $personAmount.textContent = user.toFixed(2);
    $totalAmount.textContent = total;

    $loader.classList.remove('showItem');
    $results.classList.add('showItem');
  }
})();
