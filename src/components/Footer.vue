<template>
  <footer class="footer" id="footer">
    <div class="container">
      <div class="item-group">
        <div class="item">
          <h3>相關連結</h3>
          <ul class="footer-list">
            <li>
              <router-link to="/"> <i class="fas fa-arrow-right"></i>首頁</router-link>
            </li>
            <li>
              <router-link to="/products"> <i class="fas fa-arrow-right"></i>精選茶款</router-link>
            </li>
            <li>
              <router-link to="/question"> <i class="fas fa-arrow-right"></i>常見問題</router-link>
            </li>
            <li>
              <a href="javascript:;"> <i class="fas fa-arrow-right"></i>合作企業</a>
            </li>
          </ul>
        </div>
        <div class="item">
          <h3>聯絡我們</h3>
          <ul class="footer-list">
            <li>
              <a href="javascript:;"><i class="fa-solid fa-envelope"></i>email</a>
            </li>
            <li>
              <a href="javascript:;">
                <i class="fab fa-facebook-f"></i>facebook</a>
            </li>
            <li>
              <a href="javascript:;"> <i class="fab fa-twitter"></i>twitter</a>
            </li>
            <li>
              <a href="javascript:;"><i class="fa-brands fa-line"></i>line</a>
            </li>
          </ul>
        </div>
        <div class="item subscribe-item">
          <h3>最新消息</h3>
          <form action="">
            <input type="email" placeholder="email" />
            <input type="submit" value="訂閱我們" class="btn-main" />
          </form>
        </div>
      </div>
      <router-link to="/login" style="color: var(--light-color);display:block;padding-top:15px">管理者登入 ||</router-link>
      <p  style="color: var(--light-color)">本網站僅供個人作品使用，不提供商業用途</p>
    </div>
  </footer>
</template>
