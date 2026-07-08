import LegalPageLayout from '@/components/LegalPageLayout';

const CookiePolicy = () => {
  return (
    <LegalPageLayout title="Политика использования файлов cookie">
      <p>
        Настоящая Политика использования файлов cookie (далее — «Политика») описывает, как
        РООР «КЦРОС Липецкой области» (далее — «Организация») использует файлы cookie и
        аналогичные технологии на своём сайте.
      </p>

      <h2 className="text-lg font-semibold text-secondary pt-4">1. Что такое cookie</h2>
      <p>
        Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве
        (компьютере, планшете, смартфоне) при посещении сайта. Они помогают сайту запоминать
        информацию о вашем визите, например, выбранный язык или настройки.
      </p>

      <h2 className="text-lg font-semibold text-secondary pt-4">2. Какие cookie мы используем</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <span className="font-medium">Технические (необходимые) cookie</span> — обеспечивают
          корректную работу сайта и его основных функций.
        </li>
        <li>
          <span className="font-medium">Аналитические cookie</span> — помогают понять, как
          посетители используют сайт, какие страницы наиболее популярны, для улучшения работы
          ресурса.
        </li>
      </ul>

      <h2 className="text-lg font-semibold text-secondary pt-4">3. Как мы используем cookie</h2>
      <p>
        Мы используем файлы cookie для того, чтобы сайт работал корректно, запоминал ваши
        предпочтения и позволял анализировать посещаемость с целью улучшения качества сайта.
        Мы не используем cookie для сбора персональных данных без вашего согласия.
      </p>

      <h2 className="text-lg font-semibold text-secondary pt-4">4. Управление cookie</h2>
      <p>
        Вы можете самостоятельно управлять файлами cookie в настройках своего браузера, включая
        их блокировку или удаление. Обратите внимание, что отключение некоторых cookie может
        повлиять на корректность работы отдельных функций сайта.
      </p>

      <h2 className="text-lg font-semibold text-secondary pt-4">5. Согласие на использование cookie</h2>
      <p>
        При первом посещении сайта вам предлагается ознакомиться с настоящей Политикой и
        подтвердить своё согласие на использование cookie. Продолжая использовать сайт после
        получения уведомления, вы соглашаетесь с условиями данной Политики.
      </p>

      <h2 className="text-lg font-semibold text-secondary pt-4">6. Контакты</h2>
      <p>
        По всем вопросам, связанным с использованием cookie, вы можете обратиться к нам по адресу
        электронной почты: <a href="mailto:roorktsros@yandex.ru" className="text-primary underline">roorktsros@yandex.ru</a>
      </p>
    </LegalPageLayout>
  );
};

export default CookiePolicy;
