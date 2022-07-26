!(function (d, p, u) {
  "use strict";
  function t() {
    d(u).trigger("joinchat:starting");
    var t,
      o,
      e = 1e3 * joinchat_obj.settings.button_delay,
      n = 1e3 * joinchat_obj.settings.message_delay,
      i = !!joinchat_obj.settings.message_hash,
      a = !!joinchat_obj.$(".joinchat__box").length,
      s =
        parseInt(joinchat_obj.store.getItem("joinchat_views") || 1) >=
        joinchat_obj.settings.message_views,
      h =
        -1 !==
        (joinchat_obj.store.getItem("joinchat_hashes") || "")
          .split(",")
          .filter(Boolean)
          .indexOf(joinchat_obj.settings.message_hash || "none");
    function c() {
      clearTimeout(o), joinchat_obj.chatbox_show();
    }
    function _() {
      joinchat_obj.save_hash(), joinchat_obj.chatbox_hide();
    }
    var j,
      r,
      l,
      b = "joinchat--show";
    function g() {
      var t = (u.activeElement.type || "").toLowerCase();
      0 <=
      [
        "date",
        "datetime",
        "email",
        "month",
        "number",
        "password",
        "search",
        "tel",
        "text",
        "textarea",
        "time",
        "url",
        "week",
      ].indexOf(t)
        ? joinchat_obj.chatbox
          ? (joinchat_obj.chatbox_hide(),
            setTimeout(function () {
              joinchat_obj.$div.removeClass("joinchat--show");
            }, 400))
          : joinchat_obj.$div.removeClass("joinchat--show")
        : joinchat_obj.$div.addClass("joinchat--show");
    }
    h ||
      (i && n && !joinchat_obj.settings.message_badge && s) ||
      (b += " joinchat--tooltip"),
      setTimeout(function () {
        joinchat_obj.$div.addClass(b);
      }, e),
      i &&
        !h &&
        n &&
        (joinchat_obj.settings.message_badge
          ? (o = setTimeout(function () {
              joinchat_obj
                .$(".joinchat__badge")
                .addClass("joinchat__badge--in");
            }, e + n))
          : s && (o = setTimeout(c, e + n))),
      a &&
        !joinchat_obj.is_mobile &&
        joinchat_obj
          .$(".joinchat__button")
          .on("mouseenter", function () {
            t = setTimeout(c, 1500);
          })
          .on("mouseleave", function () {
            clearTimeout(t);
          }),
      joinchat_obj.$(".joinchat__button").on("click", function () {
        a && !joinchat_obj.chatbox
          ? c()
          : Date.now() > joinchat_obj.showed_at + 600 &&
            (_(), joinchat_obj.open_whatsapp());
      }),
      joinchat_obj.$(".joinchat__close").on("click", _),
      joinchat_obj.$("#joinchat_optin").on("change", function () {
        joinchat_obj.$div.toggleClass("joinchat--optout", !this.checked);
      }),
      joinchat_obj
        .$(".joinchat__box__scroll")
        .on("mousewheel DOMMouseScroll", function (t) {
          t.preventDefault();
          t = t.originalEvent.wheelDelta || -t.originalEvent.detail;
          this.scrollTop += 30 * (t < 0 ? 1 : -1);
        }),
      joinchat_obj.is_mobile &&
        (d(u).on("focus blur", "input, textarea", function (t) {
          d(t.target).closest(joinchat_obj.$div).length ||
            (clearTimeout(j), (j = setTimeout(g, 200)));
        }),
        d(p)
          .on("resize", function () {
            clearTimeout(r),
              (r = setTimeout(function () {
                joinchat_obj.$div[0].style.setProperty(
                  "--vh",
                  window.innerHeight + "px"
                );
              }, 200));
          })
          .trigger("resize")),
      d(u).on(
        "click",
        '.joinchat_open, .joinchat_app, a[href="#joinchat"], a[href="#whatsapp"]',
        function (t) {
          t.preventDefault(),
            !a || d(this).is('.joinchat_app, a[href="#whatsapp"]')
              ? joinchat_obj.open_whatsapp()
              : c();
        }
      ),
      d(u).on("click", ".joinchat_close", function (t) {
        t.preventDefault(), joinchat_obj.chatbox_hide();
      }),
      a &&
        "IntersectionObserver" in p &&
        0 < (n = d(".joinchat_show, .joinchat_force_show")).length &&
        ((l = new IntersectionObserver(function (t) {
          d.each(t, function () {
            if (
              0 < this.intersectionRatio &&
              (!h || d(this.target).hasClass("joinchat_force_show"))
            )
              return c(), l.disconnect(), !1;
          });
        })),
        n.each(function () {
          l.observe(this);
        })),
      joinchat_obj.settings.qr &&
      !joinchat_obj.is_mobile &&
      "function" == typeof kjua
        ? joinchat_obj
            .$(".joinchat__qr")
            .kjua({
              text: joinchat_obj.whatsapp_link(void 0, void 0, !1),
              render: "canvas",
              rounded: 80,
            })
        : joinchat_obj.$(".joinchat__qr").remove(),
      a && joinchat_obj.$div.css("--peak", "url(#joinchat__message__peak)"),
      d(u).trigger("joinchat:start");
  }
  (p.joinchat_obj = p.joinchat_obj || {}),
    (joinchat_obj = d.extend(
      {
        $div: null,
        settings: null,
        store: null,
        chatbox: !1,
        showed_at: 0,
        is_mobile: !1,
      },
      joinchat_obj
    )),
    (joinchat_obj.$ = function (t) {
      return d(t || this.$div, this.$div);
    }),
    (joinchat_obj.send_event = function (e) {
      var t, o, n;
      ((e = d.extend(
        {
          event_label: "",
          event_action: "",
          chat_channel: "WhatsApp",
          chat_id: "--",
          is_mobile: this.is_mobile ? "yes" : "no",
          page_location: location.href,
          page_title: document.title || "no title",
        },
        e
      )).event_label = e.event_label || e.link || ""),
        (e.event_action = e.event_action || e.chat_channel + ": " + e.chat_id),
        delete e.link,
        !1 !== d(u).triggerHandler("joinchat:event", [e]) &&
          ((t = p[this.settings.ga_tracker] || p.ga || p.__gaTracker),
          (o =
            p[this.settings.data_layer] ||
            p[p.gtm4wp_datalayer_name] ||
            p.dataLayer),
          "function" == typeof t &&
            "function" == typeof t.getAll &&
            (t("set", "transport", "beacon"),
            t.getAll().forEach(function (t) {
              t.send("event", "JoinChat", e.event_action, e.event_label);
            })),
          d.each(e, function (t, o) {
            e[t] = "string" == typeof o ? o.substring(0, 100) : o;
          }),
          "function" == typeof gtag &&
            "object" == typeof o &&
            (delete (n = d.extend(
              { event_category: "JoinChat", transport_type: "beacon" },
              e
            )).page_location,
            delete n.page_title,
            o.forEach(function (t) {
              "config" == t[0] &&
                "G-" == t[1].substring(0, 2) &&
                ((n.send_to = t[1]), gtag("event", "generate_lead", n));
            }),
            this.settings.gads &&
              gtag("event", "conversion", { send_to: this.settings.gads })),
          "object" == typeof o && o.push(d.extend({ event: "JoinChat" }, e)),
          "function" == typeof fbq && fbq("trackCustom", "JoinChat", e));
    }),
    (joinchat_obj.whatsapp_link = function (t, o, e) {
      return (
        (o = void 0 !== o ? o : this.settings.message_send || ""),
        ((e = void 0 !== e ? e : this.settings.whatsapp_web && !this.is_mobile)
          ? "https://web.whatsapp.com/send?phone="
          : "https://wa.me/") +
          encodeURIComponent(t || this.settings.telephone) +
          (o ? (e ? "&text=" : "?text=") + encodeURIComponent(o) : "")
      );
    }),
    (joinchat_obj.chatbox_show = function () {
      this.chatbox ||
        ((this.chatbox = !0),
        (this.showed_at = Date.now()),
        this.$div.addClass("joinchat--chatbox"),
        this.settings.message_badge &&
          this.$(".joinchat__badge").hasClass("joinchat__badge--in") &&
          this.$(".joinchat__badge").toggleClass(
            "joinchat__badge--in joinchat__badge--out"
          ),
        d(u).trigger("joinchat:show"));
    }),
    (joinchat_obj.chatbox_hide = function () {
      this.chatbox &&
        ((this.chatbox = !1),
        this.$div.removeClass("joinchat--chatbox joinchat--tooltip"),
        this.settings.message_badge &&
          this.$(".joinchat__badge").removeClass("joinchat__badge--out"),
        d(u).trigger("joinchat:hide"));
    }),
    (joinchat_obj.save_hash = function () {
      var t = this.settings.message_hash || "none",
        o = (this.store.getItem("joinchat_hashes") || "")
          .split(",")
          .filter(Boolean);
      -1 === o.indexOf(t) &&
        (o.push(t), this.store.setItem("joinchat_hashes", o.join(",")));
    }),
    (joinchat_obj.open_whatsapp = function (t, o) {
      (t = t || this.settings.telephone),
        (o = void 0 !== o ? o : this.settings.message_send || "");
      (t = {
        link: this.whatsapp_link(t, o),
        chat_channel: "WhatsApp",
        chat_id: t,
        chat_message: o,
      }),
        (o = new RegExp(
          "^https?://(wa.me|(api|web|chat).whatsapp.com|" +
            location.hostname.replace(".", ".") +
            ")/.*",
          "i"
        ));
      !1 !== d(u).triggerHandler("joinchat:open", [t]) &&
        (o.test(t.link)
          ? (this.send_event(t), p.open(t.link, "joinchat", "noopener"))
          : console.error(
              "Join.chat: the link doesn't seem safe, it must point to the current domain or whatsapp.com"
            ));
    });
  var o,
    e =
      ((o = function () {
        if (((joinchat_obj.$div = d(".joinchat")), joinchat_obj.$div.length)) {
          (joinchat_obj.settings = joinchat_obj.$div.data("settings")),
            (joinchat_obj.is_mobile = !!navigator.userAgent.match(
              /Android|iPhone|BlackBerry|IEMobile|Opera Mini/i
            ));
          try {
            localStorage.setItem("test", 1),
              localStorage.removeItem("test"),
              (joinchat_obj.store = localStorage);
          } catch (t) {
            joinchat_obj.store = {
              _data: {},
              setItem: function (t, o) {
                this._data[t] = String(o);
              },
              getItem: function (t) {
                return this._data.hasOwnProperty(t) ? this._data[t] : null;
              },
            };
          }
          if ("object" != typeof joinchat_obj.settings)
            try {
              joinchat_obj.settings = JSON.parse(
                joinchat_obj.$div.attr("data-settings")
              );
            } catch (t) {
              (joinchat_obj.settings = void 0),
                console.error("Join.chat: can't get settings");
            }
          joinchat_obj.settings &&
            joinchat_obj.settings.telephone &&
            (joinchat_obj.is_mobile || !joinchat_obj.settings.mobile_only
              ? t()
              : (joinchat_obj.$div.removeClass("joinchat--show"),
                d(u).on(
                  "click",
                  '.joinchat_open, .joinchat_app, a[href="#joinchat"], a[href="#whatsapp"]',
                  function (t) {
                    t.preventDefault(), joinchat_obj.open_whatsapp();
                  }
                ))),
            joinchat_obj.store.setItem(
              "joinchat_views",
              parseInt(joinchat_obj.store.getItem("joinchat_views") || 0) + 1
            );
        }
      }),
      function () {
        o && o.apply(this, arguments), (o = null);
      });
  d(e), d(p).on("load", e), u.addEventListener("DOMContentLoaded", e);
})(jQuery, window, document);
