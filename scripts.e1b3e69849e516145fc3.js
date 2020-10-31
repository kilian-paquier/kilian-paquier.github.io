function createCookie(e, t, n) {
	let i;
	if (n) {
		let e = new Date();
		e.setTime(e.getTime() + 24 * n * 60 * 60 * 1e3),
			(i = '; expires=' + e.toUTCString());
	} else i = '';
	document.cookie = e + '=' + t + i + '; path=/';
}
function getCookie(e) {
	if (document.cookie.length > 0) {
		let t = document.cookie.indexOf(e + '=');
		if (-1 !== t) {
			t = t + e.length + 1;
			let n = document.cookie.indexOf(';', t);
			return (
				-1 === n && (n = document.cookie.length),
				unescape(document.cookie.substring(t, n))
			);
		}
	}
}
function isIE() {
	return (
		window.navigator.userAgent.indexOf('MSIE ') > 0 ||
		!!navigator.userAgent.match(/Trident.*rv\:11\./)
	);
}
!(function (e, t) {
	'use strict';
	'object' == typeof module && 'object' == typeof module.exports
		? (module.exports = e.document
				? t(e, !0)
				: function (e) {
						if (!e.document)
							throw new Error(
								'jQuery requires a window with a document'
							);
						return t(e);
				  })
		: t(e);
})('undefined' != typeof window ? window : this, function (e, t) {
	'use strict';
	var n = [],
		i = Object.getPrototypeOf,
		r = n.slice,
		o = n.flat
			? function (e) {
					return n.flat.call(e);
			  }
			: function (e) {
					return n.concat.apply([], e);
			  },
		a = n.push,
		s = n.indexOf,
		l = {},
		u = l.toString,
		c = l.hasOwnProperty,
		f = c.toString,
		d = f.call(Object),
		h = {},
		p = function (e) {
			return 'function' == typeof e && 'number' != typeof e.nodeType;
		},
		g = function (e) {
			return null != e && e === e.window;
		},
		m = e.document,
		v = { type: !0, src: !0, nonce: !0, noModule: !0 };
	function y(e, t, n) {
		var i,
			r,
			o = (n = n || m).createElement('script');
		if (((o.text = e), t))
			for (i in v)
				(r = t[i] || (t.getAttribute && t.getAttribute(i))) &&
					o.setAttribute(i, r);
		n.head.appendChild(o).parentNode.removeChild(o);
	}
	function b(e) {
		return null == e
			? e + ''
			: 'object' == typeof e || 'function' == typeof e
			? l[u.call(e)] || 'object'
			: typeof e;
	}
	var _ = '3.5.1',
		w = function (e, t) {
			return new w.fn.init(e, t);
		};
	function T(e) {
		var t = !!e && 'length' in e && e.length,
			n = b(e);
		return (
			!p(e) &&
			!g(e) &&
			('array' === n ||
				0 === t ||
				('number' == typeof t && 0 < t && t - 1 in e))
		);
	}
	(w.fn = w.prototype = {
		jquery: _,
		constructor: w,
		length: 0,
		toArray: function () {
			return r.call(this);
		},
		get: function (e) {
			return null == e
				? r.call(this)
				: e < 0
				? this[e + this.length]
				: this[e];
		},
		pushStack: function (e) {
			var t = w.merge(this.constructor(), e);
			return (t.prevObject = this), t;
		},
		each: function (e) {
			return w.each(this, e);
		},
		map: function (e) {
			return this.pushStack(
				w.map(this, function (t, n) {
					return e.call(t, n, t);
				})
			);
		},
		slice: function () {
			return this.pushStack(r.apply(this, arguments));
		},
		first: function () {
			return this.eq(0);
		},
		last: function () {
			return this.eq(-1);
		},
		even: function () {
			return this.pushStack(
				w.grep(this, function (e, t) {
					return (t + 1) % 2;
				})
			);
		},
		odd: function () {
			return this.pushStack(
				w.grep(this, function (e, t) {
					return t % 2;
				})
			);
		},
		eq: function (e) {
			var t = this.length,
				n = +e + (e < 0 ? t : 0);
			return this.pushStack(0 <= n && n < t ? [this[n]] : []);
		},
		end: function () {
			return this.prevObject || this.constructor();
		},
		push: a,
		sort: n.sort,
		splice: n.splice,
	}),
		(w.extend = w.fn.extend = function () {
			var e,
				t,
				n,
				i,
				r,
				o,
				a = arguments[0] || {},
				s = 1,
				l = arguments.length,
				u = !1;
			for (
				'boolean' == typeof a &&
					((u = a), (a = arguments[s] || {}), s++),
					'object' == typeof a || p(a) || (a = {}),
					s === l && ((a = this), s--);
				s < l;
				s++
			)
				if (null != (e = arguments[s]))
					for (t in e)
						(i = e[t]),
							'__proto__' !== t &&
								a !== i &&
								(u &&
								i &&
								(w.isPlainObject(i) || (r = Array.isArray(i)))
									? ((n = a[t]),
									  (o =
											r && !Array.isArray(n)
												? []
												: r || w.isPlainObject(n)
												? n
												: {}),
									  (r = !1),
									  (a[t] = w.extend(u, o, i)))
									: void 0 !== i && (a[t] = i));
			return a;
		}),
		w.extend({
			expando: 'jQuery' + (_ + Math.random()).replace(/\D/g, ''),
			isReady: !0,
			error: function (e) {
				throw new Error(e);
			},
			noop: function () {},
			isPlainObject: function (e) {
				var t, n;
				return !(
					!e ||
					'[object Object]' !== u.call(e) ||
					((t = i(e)) &&
						('function' !=
							typeof (n =
								c.call(t, 'constructor') && t.constructor) ||
							f.call(n) !== d))
				);
			},
			isEmptyObject: function (e) {
				var t;
				for (t in e) return !1;
				return !0;
			},
			globalEval: function (e, t, n) {
				y(e, { nonce: t && t.nonce }, n);
			},
			each: function (e, t) {
				var n,
					i = 0;
				if (T(e))
					for (
						n = e.length;
						i < n && !1 !== t.call(e[i], i, e[i]);
						i++
					);
				else for (i in e) if (!1 === t.call(e[i], i, e[i])) break;
				return e;
			},
			makeArray: function (e, t) {
				var n = t || [];
				return (
					null != e &&
						(T(Object(e))
							? w.merge(n, 'string' == typeof e ? [e] : e)
							: a.call(n, e)),
					n
				);
			},
			inArray: function (e, t, n) {
				return null == t ? -1 : s.call(t, e, n);
			},
			merge: function (e, t) {
				for (var n = +t.length, i = 0, r = e.length; i < n; i++)
					e[r++] = t[i];
				return (e.length = r), e;
			},
			grep: function (e, t, n) {
				for (var i = [], r = 0, o = e.length, a = !n; r < o; r++)
					!t(e[r], r) !== a && i.push(e[r]);
				return i;
			},
			map: function (e, t, n) {
				var i,
					r,
					a = 0,
					s = [];
				if (T(e))
					for (i = e.length; a < i; a++)
						null != (r = t(e[a], a, n)) && s.push(r);
				else for (a in e) null != (r = t(e[a], a, n)) && s.push(r);
				return o(s);
			},
			guid: 1,
			support: h,
		}),
		'function' == typeof Symbol &&
			(w.fn[Symbol.iterator] = n[Symbol.iterator]),
		w.each(
			'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
				' '
			),
			function (e, t) {
				l['[object ' + t + ']'] = t.toLowerCase();
			}
		);
	var E = (function (e) {
		var t,
			n,
			i,
			r,
			o,
			a,
			s,
			l,
			u,
			c,
			f,
			d,
			h,
			p,
			g,
			m,
			v,
			y,
			b,
			_ = 'sizzle' + 1 * new Date(),
			w = e.document,
			T = 0,
			E = 0,
			x = le(),
			C = le(),
			S = le(),
			k = le(),
			A = function (e, t) {
				return e === t && (f = !0), 0;
			},
			D = {}.hasOwnProperty,
			N = [],
			j = N.pop,
			I = N.push,
			O = N.push,
			q = N.slice,
			L = function (e, t) {
				for (var n = 0, i = e.length; n < i; n++)
					if (e[n] === t) return n;
				return -1;
			},
			P =
				'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
			R = '[\\x20\\t\\r\\n\\f]',
			H =
				'(?:\\\\[\\da-fA-F]{1,6}' +
				R +
				'?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+',
			F =
				'\\[' +
				R +
				'*(' +
				H +
				')(?:' +
				R +
				'*([*^$|!~]?=)' +
				R +
				'*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
				H +
				'))|)' +
				R +
				'*\\]',
			M =
				':(' +
				H +
				')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
				F +
				')*)|.*)\\)|)',
			$ = new RegExp(R + '+', 'g'),
			B = new RegExp(
				'^' + R + '+|((?:^|[^\\\\])(?:\\\\.)*)' + R + '+$',
				'g'
			),
			W = new RegExp('^' + R + '*,' + R + '*'),
			U = new RegExp('^' + R + '*([>+~]|' + R + ')' + R + '*'),
			Q = new RegExp(R + '|>'),
			z = new RegExp(M),
			V = new RegExp('^' + H + '$'),
			X = {
				ID: new RegExp('^#(' + H + ')'),
				CLASS: new RegExp('^\\.(' + H + ')'),
				TAG: new RegExp('^(' + H + '|[*])'),
				ATTR: new RegExp('^' + F),
				PSEUDO: new RegExp('^' + M),
				CHILD: new RegExp(
					'^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
						R +
						'*(even|odd|(([+-]|)(\\d*)n|)' +
						R +
						'*(?:([+-]|)' +
						R +
						'*(\\d+)|))' +
						R +
						'*\\)|)',
					'i'
				),
				bool: new RegExp('^(?:' + P + ')$', 'i'),
				needsContext: new RegExp(
					'^' +
						R +
						'*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
						R +
						'*((?:-\\d)?\\d*)' +
						R +
						'*\\)|)(?=[^-]|$)',
					'i'
				),
			},
			Y = /HTML$/i,
			K = /^(?:input|select|textarea|button)$/i,
			G = /^h\d$/i,
			J = /^[^{]+\{\s*\[native \w/,
			Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			ee = /[+~]/,
			te = new RegExp(
				'\\\\[\\da-fA-F]{1,6}' + R + '?|\\\\([^\\r\\n\\f])',
				'g'
			),
			ne = function (e, t) {
				var n = '0x' + e.slice(1) - 65536;
				return (
					t ||
					(n < 0
						? String.fromCharCode(n + 65536)
						: String.fromCharCode(
								(n >> 10) | 55296,
								(1023 & n) | 56320
						  ))
				);
			},
			ie = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
			re = function (e, t) {
				return t
					? '\0' === e
						? '\ufffd'
						: e.slice(0, -1) +
						  '\\' +
						  e.charCodeAt(e.length - 1).toString(16) +
						  ' '
					: '\\' + e;
			},
			oe = function () {
				d();
			},
			ae = _e(
				function (e) {
					return (
						!0 === e.disabled &&
						'fieldset' === e.nodeName.toLowerCase()
					);
				},
				{ dir: 'parentNode', next: 'legend' }
			);
		try {
			O.apply((N = q.call(w.childNodes)), w.childNodes);
		} catch (t) {
			O = {
				apply: N.length
					? function (e, t) {
							I.apply(e, q.call(t));
					  }
					: function (e, t) {
							for (var n = e.length, i = 0; (e[n++] = t[i++]); );
							e.length = n - 1;
					  },
			};
		}
		function se(e, t, i, r) {
			var o,
				s,
				u,
				c,
				f,
				p,
				v,
				y = t && t.ownerDocument,
				w = t ? t.nodeType : 9;
			if (
				((i = i || []),
				'string' != typeof e || !e || (1 !== w && 9 !== w && 11 !== w))
			)
				return i;
			if (!r && (d(t), (t = t || h), g)) {
				if (11 !== w && (f = Z.exec(e)))
					if ((o = f[1])) {
						if (9 === w) {
							if (!(u = t.getElementById(o))) return i;
							if (u.id === o) return i.push(u), i;
						} else if (
							y &&
							(u = y.getElementById(o)) &&
							b(t, u) &&
							u.id === o
						)
							return i.push(u), i;
					} else {
						if (f[2])
							return O.apply(i, t.getElementsByTagName(e)), i;
						if (
							(o = f[3]) &&
							n.getElementsByClassName &&
							t.getElementsByClassName
						)
							return O.apply(i, t.getElementsByClassName(o)), i;
					}
				if (
					n.qsa &&
					!k[e + ' '] &&
					(!m || !m.test(e)) &&
					(1 !== w || 'object' !== t.nodeName.toLowerCase())
				) {
					if (
						((v = e), (y = t), 1 === w && (Q.test(e) || U.test(e)))
					) {
						for (
							((y = (ee.test(e) && ve(t.parentNode)) || t) ===
								t &&
								n.scope) ||
								((c = t.getAttribute('id'))
									? (c = c.replace(ie, re))
									: t.setAttribute('id', (c = _))),
								s = (p = a(e)).length;
							s--;

						)
							p[s] = (c ? '#' + c : ':scope') + ' ' + be(p[s]);
						v = p.join(',');
					}
					try {
						return O.apply(i, y.querySelectorAll(v)), i;
					} catch (t) {
						k(e, !0);
					} finally {
						c === _ && t.removeAttribute('id');
					}
				}
			}
			return l(e.replace(B, '$1'), t, i, r);
		}
		function le() {
			var e = [];
			return function t(n, r) {
				return (
					e.push(n + ' ') > i.cacheLength && delete t[e.shift()],
					(t[n + ' '] = r)
				);
			};
		}
		function ue(e) {
			return (e[_] = !0), e;
		}
		function ce(e) {
			var t = h.createElement('fieldset');
			try {
				return !!e(t);
			} catch (e) {
				return !1;
			} finally {
				t.parentNode && t.parentNode.removeChild(t), (t = null);
			}
		}
		function fe(e, t) {
			for (var n = e.split('|'), r = n.length; r--; )
				i.attrHandle[n[r]] = t;
		}
		function de(e, t) {
			var n = t && e,
				i =
					n &&
					1 === e.nodeType &&
					1 === t.nodeType &&
					e.sourceIndex - t.sourceIndex;
			if (i) return i;
			if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
			return e ? 1 : -1;
		}
		function he(e) {
			return function (t) {
				return 'input' === t.nodeName.toLowerCase() && t.type === e;
			};
		}
		function pe(e) {
			return function (t) {
				var n = t.nodeName.toLowerCase();
				return ('input' === n || 'button' === n) && t.type === e;
			};
		}
		function ge(e) {
			return function (t) {
				return 'form' in t
					? t.parentNode && !1 === t.disabled
						? 'label' in t
							? 'label' in t.parentNode
								? t.parentNode.disabled === e
								: t.disabled === e
							: t.isDisabled === e ||
							  (t.isDisabled !== !e && ae(t) === e)
						: t.disabled === e
					: 'label' in t && t.disabled === e;
			};
		}
		function me(e) {
			return ue(function (t) {
				return (
					(t = +t),
					ue(function (n, i) {
						for (var r, o = e([], n.length, t), a = o.length; a--; )
							n[(r = o[a])] && (n[r] = !(i[r] = n[r]));
					})
				);
			});
		}
		function ve(e) {
			return e && void 0 !== e.getElementsByTagName && e;
		}
		for (t in ((n = se.support = {}),
		(o = se.isXML = function (e) {
			var t = (e.ownerDocument || e).documentElement;
			return !Y.test(e.namespaceURI || (t && t.nodeName) || 'HTML');
		}),
		(d = se.setDocument = function (e) {
			var t,
				r,
				a = e ? e.ownerDocument || e : w;
			return (
				a != h &&
					9 === a.nodeType &&
					a.documentElement &&
					((p = (h = a).documentElement),
					(g = !o(h)),
					w != h &&
						(r = h.defaultView) &&
						r.top !== r &&
						(r.addEventListener
							? r.addEventListener('unload', oe, !1)
							: r.attachEvent && r.attachEvent('onunload', oe)),
					(n.scope = ce(function (e) {
						return (
							p
								.appendChild(e)
								.appendChild(h.createElement('div')),
							void 0 !== e.querySelectorAll &&
								!e.querySelectorAll(':scope fieldset div')
									.length
						);
					})),
					(n.attributes = ce(function (e) {
						return (
							(e.className = 'i'), !e.getAttribute('className')
						);
					})),
					(n.getElementsByTagName = ce(function (e) {
						return (
							e.appendChild(h.createComment('')),
							!e.getElementsByTagName('*').length
						);
					})),
					(n.getElementsByClassName = J.test(
						h.getElementsByClassName
					)),
					(n.getById = ce(function (e) {
						return (
							(p.appendChild(e).id = _),
							!h.getElementsByName ||
								!h.getElementsByName(_).length
						);
					})),
					n.getById
						? ((i.filter.ID = function (e) {
								var t = e.replace(te, ne);
								return function (e) {
									return e.getAttribute('id') === t;
								};
						  }),
						  (i.find.ID = function (e, t) {
								if (void 0 !== t.getElementById && g) {
									var n = t.getElementById(e);
									return n ? [n] : [];
								}
						  }))
						: ((i.filter.ID = function (e) {
								var t = e.replace(te, ne);
								return function (e) {
									var n =
										void 0 !== e.getAttributeNode &&
										e.getAttributeNode('id');
									return n && n.value === t;
								};
						  }),
						  (i.find.ID = function (e, t) {
								if (void 0 !== t.getElementById && g) {
									var n,
										i,
										r,
										o = t.getElementById(e);
									if (o) {
										if (
											(n = o.getAttributeNode('id')) &&
											n.value === e
										)
											return [o];
										for (
											r = t.getElementsByName(e), i = 0;
											(o = r[i++]);

										)
											if (
												(n = o.getAttributeNode(
													'id'
												)) &&
												n.value === e
											)
												return [o];
									}
									return [];
								}
						  })),
					(i.find.TAG = n.getElementsByTagName
						? function (e, t) {
								return void 0 !== t.getElementsByTagName
									? t.getElementsByTagName(e)
									: n.qsa
									? t.querySelectorAll(e)
									: void 0;
						  }
						: function (e, t) {
								var n,
									i = [],
									r = 0,
									o = t.getElementsByTagName(e);
								if ('*' === e) {
									for (; (n = o[r++]); )
										1 === n.nodeType && i.push(n);
									return i;
								}
								return o;
						  }),
					(i.find.CLASS =
						n.getElementsByClassName &&
						function (e, t) {
							if (void 0 !== t.getElementsByClassName && g)
								return t.getElementsByClassName(e);
						}),
					(v = []),
					(m = []),
					(n.qsa = J.test(h.querySelectorAll)) &&
						(ce(function (e) {
							var t;
							(p.appendChild(e).innerHTML =
								"<a id='" +
								_ +
								"'></a><select id='" +
								_ +
								"-\r\\' msallowcapture=''><option selected=''></option></select>"),
								e.querySelectorAll("[msallowcapture^='']")
									.length &&
									m.push('[*^$]=' + R + '*(?:\'\'|"")'),
								e.querySelectorAll('[selected]').length ||
									m.push('\\[' + R + '*(?:value|' + P + ')'),
								e.querySelectorAll('[id~=' + _ + '-]').length ||
									m.push('~='),
								(t = h.createElement('input')).setAttribute(
									'name',
									''
								),
								e.appendChild(t),
								e.querySelectorAll("[name='']").length ||
									m.push(
										'\\[' +
											R +
											'*name' +
											R +
											'*=' +
											R +
											'*(?:\'\'|"")'
									),
								e.querySelectorAll(':checked').length ||
									m.push(':checked'),
								e.querySelectorAll('a#' + _ + '+*').length ||
									m.push('.#.+[+~]'),
								e.querySelectorAll('\\\f'),
								m.push('[\\r\\n\\f]');
						}),
						ce(function (e) {
							e.innerHTML =
								"<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
							var t = h.createElement('input');
							t.setAttribute('type', 'hidden'),
								e.appendChild(t).setAttribute('name', 'D'),
								e.querySelectorAll('[name=d]').length &&
									m.push('name' + R + '*[*^$|!~]?='),
								2 !== e.querySelectorAll(':enabled').length &&
									m.push(':enabled', ':disabled'),
								(p.appendChild(e).disabled = !0),
								2 !== e.querySelectorAll(':disabled').length &&
									m.push(':enabled', ':disabled'),
								e.querySelectorAll('*,:x'),
								m.push(',.*:');
						})),
					(n.matchesSelector = J.test(
						(y =
							p.matches ||
							p.webkitMatchesSelector ||
							p.mozMatchesSelector ||
							p.oMatchesSelector ||
							p.msMatchesSelector)
					)) &&
						ce(function (e) {
							(n.disconnectedMatch = y.call(e, '*')),
								y.call(e, "[s!='']:x"),
								v.push('!=', M);
						}),
					(m = m.length && new RegExp(m.join('|'))),
					(v = v.length && new RegExp(v.join('|'))),
					(t = J.test(p.compareDocumentPosition)),
					(b =
						t || J.test(p.contains)
							? function (e, t) {
									var n =
											9 === e.nodeType
												? e.documentElement
												: e,
										i = t && t.parentNode;
									return (
										e === i ||
										!(
											!i ||
											1 !== i.nodeType ||
											!(n.contains
												? n.contains(i)
												: e.compareDocumentPosition &&
												  16 &
														e.compareDocumentPosition(
															i
														))
										)
									);
							  }
							: function (e, t) {
									if (t)
										for (; (t = t.parentNode); )
											if (t === e) return !0;
									return !1;
							  }),
					(A = t
						? function (e, t) {
								if (e === t) return (f = !0), 0;
								var i =
									!e.compareDocumentPosition -
									!t.compareDocumentPosition;
								return (
									i ||
									(1 &
										(i =
											(e.ownerDocument || e) ==
											(t.ownerDocument || t)
												? e.compareDocumentPosition(t)
												: 1) ||
									(!n.sortDetached &&
										t.compareDocumentPosition(e) === i)
										? e == h ||
										  (e.ownerDocument == w && b(w, e))
											? -1
											: t == h ||
											  (t.ownerDocument == w && b(w, t))
											? 1
											: c
											? L(c, e) - L(c, t)
											: 0
										: 4 & i
										? -1
										: 1)
								);
						  }
						: function (e, t) {
								if (e === t) return (f = !0), 0;
								var n,
									i = 0,
									r = e.parentNode,
									o = t.parentNode,
									a = [e],
									s = [t];
								if (!r || !o)
									return e == h
										? -1
										: t == h
										? 1
										: r
										? -1
										: o
										? 1
										: c
										? L(c, e) - L(c, t)
										: 0;
								if (r === o) return de(e, t);
								for (n = e; (n = n.parentNode); ) a.unshift(n);
								for (n = t; (n = n.parentNode); ) s.unshift(n);
								for (; a[i] === s[i]; ) i++;
								return i
									? de(a[i], s[i])
									: a[i] == w
									? -1
									: s[i] == w
									? 1
									: 0;
						  })),
				h
			);
		}),
		(se.matches = function (e, t) {
			return se(e, null, null, t);
		}),
		(se.matchesSelector = function (e, t) {
			if (
				(d(e),
				n.matchesSelector &&
					g &&
					!k[t + ' '] &&
					(!v || !v.test(t)) &&
					(!m || !m.test(t)))
			)
				try {
					var i = y.call(e, t);
					if (
						i ||
						n.disconnectedMatch ||
						(e.document && 11 !== e.document.nodeType)
					)
						return i;
				} catch (e) {
					k(t, !0);
				}
			return 0 < se(t, h, null, [e]).length;
		}),
		(se.contains = function (e, t) {
			return (e.ownerDocument || e) != h && d(e), b(e, t);
		}),
		(se.attr = function (e, t) {
			(e.ownerDocument || e) != h && d(e);
			var r = i.attrHandle[t.toLowerCase()],
				o =
					r && D.call(i.attrHandle, t.toLowerCase())
						? r(e, t, !g)
						: void 0;
			return void 0 !== o
				? o
				: n.attributes || !g
				? e.getAttribute(t)
				: (o = e.getAttributeNode(t)) && o.specified
				? o.value
				: null;
		}),
		(se.escape = function (e) {
			return (e + '').replace(ie, re);
		}),
		(se.error = function (e) {
			throw new Error('Syntax error, unrecognized expression: ' + e);
		}),
		(se.uniqueSort = function (e) {
			var t,
				i = [],
				r = 0,
				o = 0;
			if (
				((f = !n.detectDuplicates),
				(c = !n.sortStable && e.slice(0)),
				e.sort(A),
				f)
			) {
				for (; (t = e[o++]); ) t === e[o] && (r = i.push(o));
				for (; r--; ) e.splice(i[r], 1);
			}
			return (c = null), e;
		}),
		(r = se.getText = function (e) {
			var t,
				n = '',
				i = 0,
				o = e.nodeType;
			if (o) {
				if (1 === o || 9 === o || 11 === o) {
					if ('string' == typeof e.textContent) return e.textContent;
					for (e = e.firstChild; e; e = e.nextSibling) n += r(e);
				} else if (3 === o || 4 === o) return e.nodeValue;
			} else for (; (t = e[i++]); ) n += r(t);
			return n;
		}),
		((i = se.selectors = {
			cacheLength: 50,
			createPseudo: ue,
			match: X,
			attrHandle: {},
			find: {},
			relative: {
				'>': { dir: 'parentNode', first: !0 },
				' ': { dir: 'parentNode' },
				'+': { dir: 'previousSibling', first: !0 },
				'~': { dir: 'previousSibling' },
			},
			preFilter: {
				ATTR: function (e) {
					return (
						(e[1] = e[1].replace(te, ne)),
						(e[3] = (e[3] || e[4] || e[5] || '').replace(te, ne)),
						'~=' === e[2] && (e[3] = ' ' + e[3] + ' '),
						e.slice(0, 4)
					);
				},
				CHILD: function (e) {
					return (
						(e[1] = e[1].toLowerCase()),
						'nth' === e[1].slice(0, 3)
							? (e[3] || se.error(e[0]),
							  (e[4] = +(e[4]
									? e[5] + (e[6] || 1)
									: 2 * ('even' === e[3] || 'odd' === e[3]))),
							  (e[5] = +(e[7] + e[8] || 'odd' === e[3])))
							: e[3] && se.error(e[0]),
						e
					);
				},
				PSEUDO: function (e) {
					var t,
						n = !e[6] && e[2];
					return X.CHILD.test(e[0])
						? null
						: (e[3]
								? (e[2] = e[4] || e[5] || '')
								: n &&
								  z.test(n) &&
								  (t = a(n, !0)) &&
								  (t =
										n.indexOf(')', n.length - t) -
										n.length) &&
								  ((e[0] = e[0].slice(0, t)),
								  (e[2] = n.slice(0, t))),
						  e.slice(0, 3));
				},
			},
			filter: {
				TAG: function (e) {
					var t = e.replace(te, ne).toLowerCase();
					return '*' === e
						? function () {
								return !0;
						  }
						: function (e) {
								return (
									e.nodeName && e.nodeName.toLowerCase() === t
								);
						  };
				},
				CLASS: function (e) {
					var t = x[e + ' '];
					return (
						t ||
						((t = new RegExp(
							'(^|' + R + ')' + e + '(' + R + '|$)'
						)) &&
							x(e, function (e) {
								return t.test(
									('string' == typeof e.className &&
										e.className) ||
										(void 0 !== e.getAttribute &&
											e.getAttribute('class')) ||
										''
								);
							}))
					);
				},
				ATTR: function (e, t, n) {
					return function (i) {
						var r = se.attr(i, e);
						return null == r
							? '!=' === t
							: !t ||
									((r += ''),
									'=' === t
										? r === n
										: '!=' === t
										? r !== n
										: '^=' === t
										? n && 0 === r.indexOf(n)
										: '*=' === t
										? n && -1 < r.indexOf(n)
										: '$=' === t
										? n && r.slice(-n.length) === n
										: '~=' === t
										? -1 <
										  (
												' ' +
												r.replace($, ' ') +
												' '
										  ).indexOf(n)
										: '|=' === t &&
										  (r === n ||
												r.slice(0, n.length + 1) ===
													n + '-'));
					};
				},
				CHILD: function (e, t, n, i, r) {
					var o = 'nth' !== e.slice(0, 3),
						a = 'last' !== e.slice(-4),
						s = 'of-type' === t;
					return 1 === i && 0 === r
						? function (e) {
								return !!e.parentNode;
						  }
						: function (t, n, l) {
								var u,
									c,
									f,
									d,
									h,
									p,
									g =
										o !== a
											? 'nextSibling'
											: 'previousSibling',
									m = t.parentNode,
									v = s && t.nodeName.toLowerCase(),
									y = !l && !s,
									b = !1;
								if (m) {
									if (o) {
										for (; g; ) {
											for (d = t; (d = d[g]); )
												if (
													s
														? d.nodeName.toLowerCase() ===
														  v
														: 1 === d.nodeType
												)
													return !1;
											p = g =
												'only' === e &&
												!p &&
												'nextSibling';
										}
										return !0;
									}
									if (
										((p = [a ? m.firstChild : m.lastChild]),
										a && y)
									) {
										for (
											b =
												(h =
													(u =
														(c =
															(f =
																(d = m)[_] ||
																(d[_] = {}))[
																d.uniqueID
															] ||
															(f[
																d.uniqueID
															] = {}))[e] ||
														[])[0] === T && u[1]) &&
												u[2],
												d = h && m.childNodes[h];
											(d =
												(++h && d && d[g]) ||
												(b = h = 0) ||
												p.pop());

										)
											if (
												1 === d.nodeType &&
												++b &&
												d === t
											) {
												c[e] = [T, h, b];
												break;
											}
									} else if (
										(y &&
											(b = h =
												(u =
													(c =
														(f =
															(d = t)[_] ||
															(d[_] = {}))[
															d.uniqueID
														] ||
														(f[d.uniqueID] = {}))[
														e
													] || [])[0] === T && u[1]),
										!1 === b)
									)
										for (
											;
											(d =
												(++h && d && d[g]) ||
												(b = h = 0) ||
												p.pop()) &&
											((s
												? d.nodeName.toLowerCase() !== v
												: 1 !== d.nodeType) ||
												!++b ||
												(y &&
													((c =
														(f =
															d[_] ||
															(d[_] = {}))[
															d.uniqueID
														] ||
														(f[d.uniqueID] = {}))[
														e
													] = [T, b]),
												d !== t));

										);
									return (
										(b -= r) === i ||
										(b % i == 0 && 0 <= b / i)
									);
								}
						  };
				},
				PSEUDO: function (e, t) {
					var n,
						r =
							i.pseudos[e] ||
							i.setFilters[e.toLowerCase()] ||
							se.error('unsupported pseudo: ' + e);
					return r[_]
						? r(t)
						: 1 < r.length
						? ((n = [e, e, '', t]),
						  i.setFilters.hasOwnProperty(e.toLowerCase())
								? ue(function (e, n) {
										for (
											var i, o = r(e, t), a = o.length;
											a--;

										)
											e[(i = L(e, o[a]))] = !(n[i] =
												o[a]);
								  })
								: function (e) {
										return r(e, 0, n);
								  })
						: r;
				},
			},
			pseudos: {
				not: ue(function (e) {
					var t = [],
						n = [],
						i = s(e.replace(B, '$1'));
					return i[_]
						? ue(function (e, t, n, r) {
								for (
									var o, a = i(e, null, r, []), s = e.length;
									s--;

								)
									(o = a[s]) && (e[s] = !(t[s] = o));
						  })
						: function (e, r, o) {
								return (
									(t[0] = e),
									i(t, null, o, n),
									(t[0] = null),
									!n.pop()
								);
						  };
				}),
				has: ue(function (e) {
					return function (t) {
						return 0 < se(e, t).length;
					};
				}),
				contains: ue(function (e) {
					return (
						(e = e.replace(te, ne)),
						function (t) {
							return -1 < (t.textContent || r(t)).indexOf(e);
						}
					);
				}),
				lang: ue(function (e) {
					return (
						V.test(e || '') || se.error('unsupported lang: ' + e),
						(e = e.replace(te, ne).toLowerCase()),
						function (t) {
							var n;
							do {
								if (
									(n = g
										? t.lang
										: t.getAttribute('xml:lang') ||
										  t.getAttribute('lang'))
								)
									return (
										(n = n.toLowerCase()) === e ||
										0 === n.indexOf(e + '-')
									);
							} while ((t = t.parentNode) && 1 === t.nodeType);
							return !1;
						}
					);
				}),
				target: function (t) {
					var n = e.location && e.location.hash;
					return n && n.slice(1) === t.id;
				},
				root: function (e) {
					return e === p;
				},
				focus: function (e) {
					return (
						e === h.activeElement &&
						(!h.hasFocus || h.hasFocus()) &&
						!!(e.type || e.href || ~e.tabIndex)
					);
				},
				enabled: ge(!1),
				disabled: ge(!0),
				checked: function (e) {
					var t = e.nodeName.toLowerCase();
					return (
						('input' === t && !!e.checked) ||
						('option' === t && !!e.selected)
					);
				},
				selected: function (e) {
					return !0 === e.selected;
				},
				empty: function (e) {
					for (e = e.firstChild; e; e = e.nextSibling)
						if (e.nodeType < 6) return !1;
					return !0;
				},
				parent: function (e) {
					return !i.pseudos.empty(e);
				},
				header: function (e) {
					return G.test(e.nodeName);
				},
				input: function (e) {
					return K.test(e.nodeName);
				},
				button: function (e) {
					var t = e.nodeName.toLowerCase();
					return (
						('input' === t && 'button' === e.type) || 'button' === t
					);
				},
				text: function (e) {
					var t;
					return (
						'input' === e.nodeName.toLowerCase() &&
						'text' === e.type &&
						(null == (t = e.getAttribute('type')) ||
							'text' === t.toLowerCase())
					);
				},
				first: me(function () {
					return [0];
				}),
				last: me(function (e, t) {
					return [t - 1];
				}),
				eq: me(function (e, t, n) {
					return [n < 0 ? n + t : n];
				}),
				even: me(function (e, t) {
					for (var n = 0; n < t; n += 2) e.push(n);
					return e;
				}),
				odd: me(function (e, t) {
					for (var n = 1; n < t; n += 2) e.push(n);
					return e;
				}),
				lt: me(function (e, t, n) {
					for (var i = n < 0 ? n + t : t < n ? t : n; 0 <= --i; )
						e.push(i);
					return e;
				}),
				gt: me(function (e, t, n) {
					for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
					return e;
				}),
			},
		}).pseudos.nth = i.pseudos.eq),
		{ radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
			i.pseudos[t] = he(t);
		for (t in { submit: !0, reset: !0 }) i.pseudos[t] = pe(t);
		function ye() {}
		function be(e) {
			for (var t = 0, n = e.length, i = ''; t < n; t++) i += e[t].value;
			return i;
		}
		function _e(e, t, n) {
			var i = t.dir,
				r = t.next,
				o = r || i,
				a = n && 'parentNode' === o,
				s = E++;
			return t.first
				? function (t, n, r) {
						for (; (t = t[i]); )
							if (1 === t.nodeType || a) return e(t, n, r);
						return !1;
				  }
				: function (t, n, l) {
						var u,
							c,
							f,
							d = [T, s];
						if (l) {
							for (; (t = t[i]); )
								if ((1 === t.nodeType || a) && e(t, n, l))
									return !0;
						} else
							for (; (t = t[i]); )
								if (1 === t.nodeType || a)
									if (
										((c =
											(f = t[_] || (t[_] = {}))[
												t.uniqueID
											] || (f[t.uniqueID] = {})),
										r && r === t.nodeName.toLowerCase())
									)
										t = t[i] || t;
									else {
										if (
											(u = c[o]) &&
											u[0] === T &&
											u[1] === s
										)
											return (d[2] = u[2]);
										if (((c[o] = d)[2] = e(t, n, l)))
											return !0;
									}
						return !1;
				  };
		}
		function we(e) {
			return 1 < e.length
				? function (t, n, i) {
						for (var r = e.length; r--; )
							if (!e[r](t, n, i)) return !1;
						return !0;
				  }
				: e[0];
		}
		function Te(e, t, n, i, r) {
			for (var o, a = [], s = 0, l = e.length, u = null != t; s < l; s++)
				(o = e[s]) &&
					((n && !n(o, i, r)) || (a.push(o), u && t.push(s)));
			return a;
		}
		function Ee(e, t, n, i, r, o) {
			return (
				i && !i[_] && (i = Ee(i)),
				r && !r[_] && (r = Ee(r, o)),
				ue(function (o, a, s, l) {
					var u,
						c,
						f,
						d = [],
						h = [],
						p = a.length,
						g =
							o ||
							(function (e, t, n) {
								for (var i = 0, r = t.length; i < r; i++)
									se(e, t[i], n);
								return n;
							})(t || '*', s.nodeType ? [s] : s, []),
						m = !e || (!o && t) ? g : Te(g, d, e, s, l),
						v = n ? (r || (o ? e : p || i) ? [] : a) : m;
					if ((n && n(m, v, s, l), i))
						for (u = Te(v, h), i(u, [], s, l), c = u.length; c--; )
							(f = u[c]) && (v[h[c]] = !(m[h[c]] = f));
					if (o) {
						if (r || e) {
							if (r) {
								for (u = [], c = v.length; c--; )
									(f = v[c]) && u.push((m[c] = f));
								r(null, (v = []), u, l);
							}
							for (c = v.length; c--; )
								(f = v[c]) &&
									-1 < (u = r ? L(o, f) : d[c]) &&
									(o[u] = !(a[u] = f));
						}
					} else (v = Te(v === a ? v.splice(p, v.length) : v)), r ? r(null, a, v, l) : O.apply(a, v);
				})
			);
		}
		function xe(e) {
			for (
				var t,
					n,
					r,
					o = e.length,
					a = i.relative[e[0].type],
					s = a || i.relative[' '],
					l = a ? 1 : 0,
					c = _e(
						function (e) {
							return e === t;
						},
						s,
						!0
					),
					f = _e(
						function (e) {
							return -1 < L(t, e);
						},
						s,
						!0
					),
					d = [
						function (e, n, i) {
							var r =
								(!a && (i || n !== u)) ||
								((t = n).nodeType ? c(e, n, i) : f(e, n, i));
							return (t = null), r;
						},
					];
				l < o;
				l++
			)
				if ((n = i.relative[e[l].type])) d = [_e(we(d), n)];
				else {
					if (
						(n = i.filter[e[l].type].apply(null, e[l].matches))[_]
					) {
						for (r = ++l; r < o && !i.relative[e[r].type]; r++);
						return Ee(
							1 < l && we(d),
							1 < l &&
								be(
									e
										.slice(0, l - 1)
										.concat({
											value:
												' ' === e[l - 2].type
													? '*'
													: '',
										})
								).replace(B, '$1'),
							n,
							l < r && xe(e.slice(l, r)),
							r < o && xe((e = e.slice(r))),
							r < o && be(e)
						);
					}
					d.push(n);
				}
			return we(d);
		}
		return (
			(ye.prototype = i.filters = i.pseudos),
			(i.setFilters = new ye()),
			(a = se.tokenize = function (e, t) {
				var n,
					r,
					o,
					a,
					s,
					l,
					u,
					c = C[e + ' '];
				if (c) return t ? 0 : c.slice(0);
				for (s = e, l = [], u = i.preFilter; s; ) {
					for (a in ((n && !(r = W.exec(s))) ||
						(r && (s = s.slice(r[0].length) || s),
						l.push((o = []))),
					(n = !1),
					(r = U.exec(s)) &&
						((n = r.shift()),
						o.push({ value: n, type: r[0].replace(B, ' ') }),
						(s = s.slice(n.length))),
					i.filter))
						!(r = X[a].exec(s)) ||
							(u[a] && !(r = u[a](r))) ||
							((n = r.shift()),
							o.push({ value: n, type: a, matches: r }),
							(s = s.slice(n.length)));
					if (!n) break;
				}
				return t ? s.length : s ? se.error(e) : C(e, l).slice(0);
			}),
			(s = se.compile = function (e, t) {
				var n,
					r,
					o,
					s,
					l,
					c,
					f = [],
					p = [],
					m = S[e + ' '];
				if (!m) {
					for (t || (t = a(e)), n = t.length; n--; )
						(m = xe(t[n]))[_] ? f.push(m) : p.push(m);
					(m = S(
						e,
						((r = p),
						(s = 0 < (o = f).length),
						(l = 0 < r.length),
						(c = function (e, t, n, a, c) {
							var f,
								p,
								m,
								v = 0,
								y = '0',
								b = e && [],
								_ = [],
								w = u,
								E = e || (l && i.find.TAG('*', c)),
								x = (T += null == w ? 1 : Math.random() || 0.1),
								C = E.length;
							for (
								c && (u = t == h || t || c);
								y !== C && null != (f = E[y]);
								y++
							) {
								if (l && f) {
									for (
										p = 0,
											t ||
												f.ownerDocument == h ||
												(d(f), (n = !g));
										(m = r[p++]);

									)
										if (m(f, t || h, n)) {
											a.push(f);
											break;
										}
									c && (T = x);
								}
								s && ((f = !m && f) && v--, e && b.push(f));
							}
							if (((v += y), s && y !== v)) {
								for (p = 0; (m = o[p++]); ) m(b, _, t, n);
								if (e) {
									if (0 < v)
										for (; y--; )
											b[y] || _[y] || (_[y] = j.call(a));
									_ = Te(_);
								}
								O.apply(a, _),
									c &&
										!e &&
										0 < _.length &&
										1 < v + o.length &&
										se.uniqueSort(a);
							}
							return c && ((T = x), (u = w)), b;
						}),
						s ? ue(c) : c)
					)).selector = e;
				}
				return m;
			}),
			(l = se.select = function (e, t, n, r) {
				var o,
					l,
					u,
					c,
					f,
					d = 'function' == typeof e && e,
					h = !r && a((e = d.selector || e));
				if (((n = n || []), 1 === h.length)) {
					if (
						2 < (l = h[0] = h[0].slice(0)).length &&
						'ID' === (u = l[0]).type &&
						9 === t.nodeType &&
						g &&
						i.relative[l[1].type]
					) {
						if (
							!(t = (i.find.ID(u.matches[0].replace(te, ne), t) ||
								[])[0])
						)
							return n;
						d && (t = t.parentNode),
							(e = e.slice(l.shift().value.length));
					}
					for (
						o = X.needsContext.test(e) ? 0 : l.length;
						o-- && !i.relative[(c = (u = l[o]).type)];

					)
						if (
							(f = i.find[c]) &&
							(r = f(
								u.matches[0].replace(te, ne),
								(ee.test(l[0].type) && ve(t.parentNode)) || t
							))
						) {
							if ((l.splice(o, 1), !(e = r.length && be(l))))
								return O.apply(n, r), n;
							break;
						}
				}
				return (
					(d || s(e, h))(
						r,
						t,
						!g,
						n,
						!t || (ee.test(e) && ve(t.parentNode)) || t
					),
					n
				);
			}),
			(n.sortStable = _.split('').sort(A).join('') === _),
			(n.detectDuplicates = !!f),
			d(),
			(n.sortDetached = ce(function (e) {
				return (
					1 & e.compareDocumentPosition(h.createElement('fieldset'))
				);
			})),
			ce(function (e) {
				return (
					(e.innerHTML = "<a href='#'></a>"),
					'#' === e.firstChild.getAttribute('href')
				);
			}) ||
				fe('type|href|height|width', function (e, t, n) {
					if (!n)
						return e.getAttribute(
							t,
							'type' === t.toLowerCase() ? 1 : 2
						);
				}),
			(n.attributes &&
				ce(function (e) {
					return (
						(e.innerHTML = '<input/>'),
						e.firstChild.setAttribute('value', ''),
						'' === e.firstChild.getAttribute('value')
					);
				})) ||
				fe('value', function (e, t, n) {
					if (!n && 'input' === e.nodeName.toLowerCase())
						return e.defaultValue;
				}),
			ce(function (e) {
				return null == e.getAttribute('disabled');
			}) ||
				fe(P, function (e, t, n) {
					var i;
					if (!n)
						return !0 === e[t]
							? t.toLowerCase()
							: (i = e.getAttributeNode(t)) && i.specified
							? i.value
							: null;
				}),
			se
		);
	})(e);
	(w.find = E),
		(w.expr = E.selectors),
		(w.expr[':'] = w.expr.pseudos),
		(w.uniqueSort = w.unique = E.uniqueSort),
		(w.text = E.getText),
		(w.isXMLDoc = E.isXML),
		(w.contains = E.contains),
		(w.escapeSelector = E.escape);
	var x = function (e, t, n) {
			for (var i = [], r = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
				if (1 === e.nodeType) {
					if (r && w(e).is(n)) break;
					i.push(e);
				}
			return i;
		},
		C = function (e, t) {
			for (var n = []; e; e = e.nextSibling)
				1 === e.nodeType && e !== t && n.push(e);
			return n;
		},
		S = w.expr.match.needsContext;
	function k(e, t) {
		return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
	}
	var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
	function D(e, t, n) {
		return p(t)
			? w.grep(e, function (e, i) {
					return !!t.call(e, i, e) !== n;
			  })
			: t.nodeType
			? w.grep(e, function (e) {
					return (e === t) !== n;
			  })
			: 'string' != typeof t
			? w.grep(e, function (e) {
					return -1 < s.call(t, e) !== n;
			  })
			: w.filter(t, e, n);
	}
	(w.filter = function (e, t, n) {
		var i = t[0];
		return (
			n && (e = ':not(' + e + ')'),
			1 === t.length && 1 === i.nodeType
				? w.find.matchesSelector(i, e)
					? [i]
					: []
				: w.find.matches(
						e,
						w.grep(t, function (e) {
							return 1 === e.nodeType;
						})
				  )
		);
	}),
		w.fn.extend({
			find: function (e) {
				var t,
					n,
					i = this.length,
					r = this;
				if ('string' != typeof e)
					return this.pushStack(
						w(e).filter(function () {
							for (t = 0; t < i; t++)
								if (w.contains(r[t], this)) return !0;
						})
					);
				for (n = this.pushStack([]), t = 0; t < i; t++)
					w.find(e, r[t], n);
				return 1 < i ? w.uniqueSort(n) : n;
			},
			filter: function (e) {
				return this.pushStack(D(this, e || [], !1));
			},
			not: function (e) {
				return this.pushStack(D(this, e || [], !0));
			},
			is: function (e) {
				return !!D(
					this,
					'string' == typeof e && S.test(e) ? w(e) : e || [],
					!1
				).length;
			},
		});
	var N,
		j = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
	((w.fn.init = function (e, t, n) {
		var i, r;
		if (!e) return this;
		if (((n = n || N), 'string' == typeof e)) {
			if (
				!(i =
					'<' === e[0] && '>' === e[e.length - 1] && 3 <= e.length
						? [null, e, null]
						: j.exec(e)) ||
				(!i[1] && t)
			)
				return !t || t.jquery
					? (t || n).find(e)
					: this.constructor(t).find(e);
			if (i[1]) {
				if (
					(w.merge(
						this,
						w.parseHTML(
							i[1],
							(t = t instanceof w ? t[0] : t) && t.nodeType
								? t.ownerDocument || t
								: m,
							!0
						)
					),
					A.test(i[1]) && w.isPlainObject(t))
				)
					for (i in t)
						p(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
				return this;
			}
			return (
				(r = m.getElementById(i[2])) &&
					((this[0] = r), (this.length = 1)),
				this
			);
		}
		return e.nodeType
			? ((this[0] = e), (this.length = 1), this)
			: p(e)
			? void 0 !== n.ready
				? n.ready(e)
				: e(w)
			: w.makeArray(e, this);
	}).prototype = w.fn),
		(N = w(m));
	var I = /^(?:parents|prev(?:Until|All))/,
		O = { children: !0, contents: !0, next: !0, prev: !0 };
	function q(e, t) {
		for (; (e = e[t]) && 1 !== e.nodeType; );
		return e;
	}
	w.fn.extend({
		has: function (e) {
			var t = w(e, this),
				n = t.length;
			return this.filter(function () {
				for (var e = 0; e < n; e++)
					if (w.contains(this, t[e])) return !0;
			});
		},
		closest: function (e, t) {
			var n,
				i = 0,
				r = this.length,
				o = [],
				a = 'string' != typeof e && w(e);
			if (!S.test(e))
				for (; i < r; i++)
					for (n = this[i]; n && n !== t; n = n.parentNode)
						if (
							n.nodeType < 11 &&
							(a
								? -1 < a.index(n)
								: 1 === n.nodeType &&
								  w.find.matchesSelector(n, e))
						) {
							o.push(n);
							break;
						}
			return this.pushStack(1 < o.length ? w.uniqueSort(o) : o);
		},
		index: function (e) {
			return e
				? 'string' == typeof e
					? s.call(w(e), this[0])
					: s.call(this, e.jquery ? e[0] : e)
				: this[0] && this[0].parentNode
				? this.first().prevAll().length
				: -1;
		},
		add: function (e, t) {
			return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))));
		},
		addBack: function (e) {
			return this.add(
				null == e ? this.prevObject : this.prevObject.filter(e)
			);
		},
	}),
		w.each(
			{
				parent: function (e) {
					var t = e.parentNode;
					return t && 11 !== t.nodeType ? t : null;
				},
				parents: function (e) {
					return x(e, 'parentNode');
				},
				parentsUntil: function (e, t, n) {
					return x(e, 'parentNode', n);
				},
				next: function (e) {
					return q(e, 'nextSibling');
				},
				prev: function (e) {
					return q(e, 'previousSibling');
				},
				nextAll: function (e) {
					return x(e, 'nextSibling');
				},
				prevAll: function (e) {
					return x(e, 'previousSibling');
				},
				nextUntil: function (e, t, n) {
					return x(e, 'nextSibling', n);
				},
				prevUntil: function (e, t, n) {
					return x(e, 'previousSibling', n);
				},
				siblings: function (e) {
					return C((e.parentNode || {}).firstChild, e);
				},
				children: function (e) {
					return C(e.firstChild);
				},
				contents: function (e) {
					return null != e.contentDocument && i(e.contentDocument)
						? e.contentDocument
						: (k(e, 'template') && (e = e.content || e),
						  w.merge([], e.childNodes));
				},
			},
			function (e, t) {
				w.fn[e] = function (n, i) {
					var r = w.map(this, t, n);
					return (
						'Until' !== e.slice(-5) && (i = n),
						i && 'string' == typeof i && (r = w.filter(i, r)),
						1 < this.length &&
							(O[e] || w.uniqueSort(r), I.test(e) && r.reverse()),
						this.pushStack(r)
					);
				};
			}
		);
	var L = /[^\x20\t\r\n\f]+/g;
	function P(e) {
		return e;
	}
	function R(e) {
		throw e;
	}
	function H(e, t, n, i) {
		var r;
		try {
			e && p((r = e.promise))
				? r.call(e).done(t).fail(n)
				: e && p((r = e.then))
				? r.call(e, t, n)
				: t.apply(void 0, [e].slice(i));
		} catch (e) {
			n.apply(void 0, [e]);
		}
	}
	(w.Callbacks = function (e) {
		var t;
		e =
			'string' == typeof e
				? ((t = {}),
				  w.each(e.match(L) || [], function (e, n) {
						t[n] = !0;
				  }),
				  t)
				: w.extend({}, e);
		var n,
			i,
			r,
			o,
			a = [],
			s = [],
			l = -1,
			u = function () {
				for (o = o || e.once, r = n = !0; s.length; l = -1)
					for (i = s.shift(); ++l < a.length; )
						!1 === a[l].apply(i[0], i[1]) &&
							e.stopOnFalse &&
							((l = a.length), (i = !1));
				e.memory || (i = !1), (n = !1), o && (a = i ? [] : '');
			},
			c = {
				add: function () {
					return (
						a &&
							(i && !n && ((l = a.length - 1), s.push(i)),
							(function t(n) {
								w.each(n, function (n, i) {
									p(i)
										? (e.unique && c.has(i)) || a.push(i)
										: i &&
										  i.length &&
										  'string' !== b(i) &&
										  t(i);
								});
							})(arguments),
							i && !n && u()),
						this
					);
				},
				remove: function () {
					return (
						w.each(arguments, function (e, t) {
							for (var n; -1 < (n = w.inArray(t, a, n)); )
								a.splice(n, 1), n <= l && l--;
						}),
						this
					);
				},
				has: function (e) {
					return e ? -1 < w.inArray(e, a) : 0 < a.length;
				},
				empty: function () {
					return a && (a = []), this;
				},
				disable: function () {
					return (o = s = []), (a = i = ''), this;
				},
				disabled: function () {
					return !a;
				},
				lock: function () {
					return (o = s = []), i || n || (a = i = ''), this;
				},
				locked: function () {
					return !!o;
				},
				fireWith: function (e, t) {
					return (
						o ||
							((t = [e, (t = t || []).slice ? t.slice() : t]),
							s.push(t),
							n || u()),
						this
					);
				},
				fire: function () {
					return c.fireWith(this, arguments), this;
				},
				fired: function () {
					return !!r;
				},
			};
		return c;
	}),
		w.extend({
			Deferred: function (t) {
				var n = [
						[
							'notify',
							'progress',
							w.Callbacks('memory'),
							w.Callbacks('memory'),
							2,
						],
						[
							'resolve',
							'done',
							w.Callbacks('once memory'),
							w.Callbacks('once memory'),
							0,
							'resolved',
						],
						[
							'reject',
							'fail',
							w.Callbacks('once memory'),
							w.Callbacks('once memory'),
							1,
							'rejected',
						],
					],
					i = 'pending',
					r = {
						state: function () {
							return i;
						},
						always: function () {
							return o.done(arguments).fail(arguments), this;
						},
						catch: function (e) {
							return r.then(null, e);
						},
						pipe: function () {
							var e = arguments;
							return w
								.Deferred(function (t) {
									w.each(n, function (n, i) {
										var r = p(e[i[4]]) && e[i[4]];
										o[i[1]](function () {
											var e =
												r && r.apply(this, arguments);
											e && p(e.promise)
												? e
														.promise()
														.progress(t.notify)
														.done(t.resolve)
														.fail(t.reject)
												: t[i[0] + 'With'](
														this,
														r ? [e] : arguments
												  );
										});
									}),
										(e = null);
								})
								.promise();
						},
						then: function (t, i, r) {
							var o = 0;
							function a(t, n, i, r) {
								return function () {
									var s = this,
										l = arguments,
										u = function () {
											var e, u;
											if (!(t < o)) {
												if (
													(e = i.apply(s, l)) ===
													n.promise()
												)
													throw new TypeError(
														'Thenable self-resolution'
													);
												p(
													(u =
														e &&
														('object' == typeof e ||
															'function' ==
																typeof e) &&
														e.then)
												)
													? r
														? u.call(
																e,
																a(o, n, P, r),
																a(o, n, R, r)
														  )
														: (o++,
														  u.call(
																e,
																a(o, n, P, r),
																a(o, n, R, r),
																a(
																	o,
																	n,
																	P,
																	n.notifyWith
																)
														  ))
													: (i !== P &&
															((s = void 0),
															(l = [e])),
													  (r || n.resolveWith)(
															s,
															l
													  ));
											}
										},
										c = r
											? u
											: function () {
													try {
														u();
													} catch (u) {
														w.Deferred
															.exceptionHook &&
															w.Deferred.exceptionHook(
																u,
																c.stackTrace
															),
															o <= t + 1 &&
																(i !== R &&
																	((s = void 0),
																	(l = [u])),
																n.rejectWith(
																	s,
																	l
																));
													}
											  };
									t
										? c()
										: (w.Deferred.getStackHook &&
												(c.stackTrace = w.Deferred.getStackHook()),
										  e.setTimeout(c));
								};
							}
							return w
								.Deferred(function (e) {
									n[0][3].add(
										a(0, e, p(r) ? r : P, e.notifyWith)
									),
										n[1][3].add(a(0, e, p(t) ? t : P)),
										n[2][3].add(a(0, e, p(i) ? i : R));
								})
								.promise();
						},
						promise: function (e) {
							return null != e ? w.extend(e, r) : r;
						},
					},
					o = {};
				return (
					w.each(n, function (e, t) {
						var a = t[2],
							s = t[5];
						(r[t[1]] = a.add),
							s &&
								a.add(
									function () {
										i = s;
									},
									n[3 - e][2].disable,
									n[3 - e][3].disable,
									n[0][2].lock,
									n[0][3].lock
								),
							a.add(t[3].fire),
							(o[t[0]] = function () {
								return (
									o[t[0] + 'With'](
										this === o ? void 0 : this,
										arguments
									),
									this
								);
							}),
							(o[t[0] + 'With'] = a.fireWith);
					}),
					r.promise(o),
					t && t.call(o, o),
					o
				);
			},
			when: function (e) {
				var t = arguments.length,
					n = t,
					i = Array(n),
					o = r.call(arguments),
					a = w.Deferred(),
					s = function (e) {
						return function (n) {
							(i[e] = this),
								(o[e] =
									1 < arguments.length
										? r.call(arguments)
										: n),
								--t || a.resolveWith(i, o);
						};
					};
				if (
					t <= 1 &&
					(H(e, a.done(s(n)).resolve, a.reject, !t),
					'pending' === a.state() || p(o[n] && o[n].then))
				)
					return a.then();
				for (; n--; ) H(o[n], s(n), a.reject);
				return a.promise();
			},
		});
	var F = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
	(w.Deferred.exceptionHook = function (t, n) {
		e.console &&
			e.console.warn &&
			t &&
			F.test(t.name) &&
			e.console.warn(
				'jQuery.Deferred exception: ' + t.message,
				t.stack,
				n
			);
	}),
		(w.readyException = function (t) {
			e.setTimeout(function () {
				throw t;
			});
		});
	var M = w.Deferred();
	function $() {
		m.removeEventListener('DOMContentLoaded', $),
			e.removeEventListener('load', $),
			w.ready();
	}
	(w.fn.ready = function (e) {
		return (
			M.then(e).catch(function (e) {
				w.readyException(e);
			}),
			this
		);
	}),
		w.extend({
			isReady: !1,
			readyWait: 1,
			ready: function (e) {
				(!0 === e ? --w.readyWait : w.isReady) ||
					((w.isReady = !0) !== e && 0 < --w.readyWait) ||
					M.resolveWith(m, [w]);
			},
		}),
		(w.ready.then = M.then),
		'complete' === m.readyState ||
		('loading' !== m.readyState && !m.documentElement.doScroll)
			? e.setTimeout(w.ready)
			: (m.addEventListener('DOMContentLoaded', $),
			  e.addEventListener('load', $));
	var B = function (e, t, n, i, r, o, a) {
			var s = 0,
				l = e.length,
				u = null == n;
			if ('object' === b(n))
				for (s in ((r = !0), n)) B(e, t, s, n[s], !0, o, a);
			else if (
				void 0 !== i &&
				((r = !0),
				p(i) || (a = !0),
				u &&
					(a
						? (t.call(e, i), (t = null))
						: ((u = t),
						  (t = function (e, t, n) {
								return u.call(w(e), n);
						  }))),
				t)
			)
				for (; s < l; s++)
					t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
			return r ? e : u ? t.call(e) : l ? t(e[0], n) : o;
		},
		W = /^-ms-/,
		U = /-([a-z])/g;
	function Q(e, t) {
		return t.toUpperCase();
	}
	function z(e) {
		return e.replace(W, 'ms-').replace(U, Q);
	}
	var V = function (e) {
		return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
	};
	function X() {
		this.expando = w.expando + X.uid++;
	}
	(X.uid = 1),
		(X.prototype = {
			cache: function (e) {
				var t = e[this.expando];
				return (
					t ||
						((t = {}),
						V(e) &&
							(e.nodeType
								? (e[this.expando] = t)
								: Object.defineProperty(e, this.expando, {
										value: t,
										configurable: !0,
								  }))),
					t
				);
			},
			set: function (e, t, n) {
				var i,
					r = this.cache(e);
				if ('string' == typeof t) r[z(t)] = n;
				else for (i in t) r[z(i)] = t[i];
				return r;
			},
			get: function (e, t) {
				return void 0 === t
					? this.cache(e)
					: e[this.expando] && e[this.expando][z(t)];
			},
			access: function (e, t, n) {
				return void 0 === t ||
					(t && 'string' == typeof t && void 0 === n)
					? this.get(e, t)
					: (this.set(e, t, n), void 0 !== n ? n : t);
			},
			remove: function (e, t) {
				var n,
					i = e[this.expando];
				if (void 0 !== i) {
					if (void 0 !== t) {
						n = (t = Array.isArray(t)
							? t.map(z)
							: (t = z(t)) in i
							? [t]
							: t.match(L) || []).length;
						for (; n--; ) delete i[t[n]];
					}
					(void 0 === t || w.isEmptyObject(i)) &&
						(e.nodeType
							? (e[this.expando] = void 0)
							: delete e[this.expando]);
				}
			},
			hasData: function (e) {
				var t = e[this.expando];
				return void 0 !== t && !w.isEmptyObject(t);
			},
		});
	var Y = new X(),
		K = new X(),
		G = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		J = /[A-Z]/g;
	function Z(e, t, n) {
		var i, r;
		if (void 0 === n && 1 === e.nodeType)
			if (
				((i = 'data-' + t.replace(J, '-$&').toLowerCase()),
				'string' == typeof (n = e.getAttribute(i)))
			) {
				try {
					n =
						'true' === (r = n) ||
						('false' !== r &&
							('null' === r
								? null
								: r === +r + ''
								? +r
								: G.test(r)
								? JSON.parse(r)
								: r));
				} catch (e) {}
				K.set(e, t, n);
			} else n = void 0;
		return n;
	}
	w.extend({
		hasData: function (e) {
			return K.hasData(e) || Y.hasData(e);
		},
		data: function (e, t, n) {
			return K.access(e, t, n);
		},
		removeData: function (e, t) {
			K.remove(e, t);
		},
		_data: function (e, t, n) {
			return Y.access(e, t, n);
		},
		_removeData: function (e, t) {
			Y.remove(e, t);
		},
	}),
		w.fn.extend({
			data: function (e, t) {
				var n,
					i,
					r,
					o = this[0],
					a = o && o.attributes;
				if (void 0 === e) {
					if (
						this.length &&
						((r = K.get(o)),
						1 === o.nodeType && !Y.get(o, 'hasDataAttrs'))
					) {
						for (n = a.length; n--; )
							a[n] &&
								0 === (i = a[n].name).indexOf('data-') &&
								((i = z(i.slice(5))), Z(o, i, r[i]));
						Y.set(o, 'hasDataAttrs', !0);
					}
					return r;
				}
				return 'object' == typeof e
					? this.each(function () {
							K.set(this, e);
					  })
					: B(
							this,
							function (t) {
								var n;
								if (o && void 0 === t)
									return void 0 !== (n = K.get(o, e)) ||
										void 0 !== (n = Z(o, e))
										? n
										: void 0;
								this.each(function () {
									K.set(this, e, t);
								});
							},
							null,
							t,
							1 < arguments.length,
							null,
							!0
					  );
			},
			removeData: function (e) {
				return this.each(function () {
					K.remove(this, e);
				});
			},
		}),
		w.extend({
			queue: function (e, t, n) {
				var i;
				if (e)
					return (
						(i = Y.get(e, (t = (t || 'fx') + 'queue'))),
						n &&
							(!i || Array.isArray(n)
								? (i = Y.access(e, t, w.makeArray(n)))
								: i.push(n)),
						i || []
					);
			},
			dequeue: function (e, t) {
				var n = w.queue(e, (t = t || 'fx')),
					i = n.length,
					r = n.shift(),
					o = w._queueHooks(e, t);
				'inprogress' === r && ((r = n.shift()), i--),
					r &&
						('fx' === t && n.unshift('inprogress'),
						delete o.stop,
						r.call(
							e,
							function () {
								w.dequeue(e, t);
							},
							o
						)),
					!i && o && o.empty.fire();
			},
			_queueHooks: function (e, t) {
				var n = t + 'queueHooks';
				return (
					Y.get(e, n) ||
					Y.access(e, n, {
						empty: w.Callbacks('once memory').add(function () {
							Y.remove(e, [t + 'queue', n]);
						}),
					})
				);
			},
		}),
		w.fn.extend({
			queue: function (e, t) {
				var n = 2;
				return (
					'string' != typeof e && ((t = e), (e = 'fx'), n--),
					arguments.length < n
						? w.queue(this[0], e)
						: void 0 === t
						? this
						: this.each(function () {
								var n = w.queue(this, e, t);
								w._queueHooks(this, e),
									'fx' === e &&
										'inprogress' !== n[0] &&
										w.dequeue(this, e);
						  })
				);
			},
			dequeue: function (e) {
				return this.each(function () {
					w.dequeue(this, e);
				});
			},
			clearQueue: function (e) {
				return this.queue(e || 'fx', []);
			},
			promise: function (e, t) {
				var n,
					i = 1,
					r = w.Deferred(),
					o = this,
					a = this.length,
					s = function () {
						--i || r.resolveWith(o, [o]);
					};
				for (
					'string' != typeof e && ((t = e), (e = void 0)),
						e = e || 'fx';
					a--;

				)
					(n = Y.get(o[a], e + 'queueHooks')) &&
						n.empty &&
						(i++, n.empty.add(s));
				return s(), r.promise(t);
			},
		});
	var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		te = new RegExp('^(?:([+-])=|)(' + ee + ')([a-z%]*)$', 'i'),
		ne = ['Top', 'Right', 'Bottom', 'Left'],
		ie = m.documentElement,
		re = function (e) {
			return w.contains(e.ownerDocument, e);
		},
		oe = { composed: !0 };
	ie.getRootNode &&
		(re = function (e) {
			return (
				w.contains(e.ownerDocument, e) ||
				e.getRootNode(oe) === e.ownerDocument
			);
		});
	var ae = function (e, t) {
		return (
			'none' === (e = t || e).style.display ||
			('' === e.style.display && re(e) && 'none' === w.css(e, 'display'))
		);
	};
	function se(e, t, n, i) {
		var r,
			o,
			a = 20,
			s = i
				? function () {
						return i.cur();
				  }
				: function () {
						return w.css(e, t, '');
				  },
			l = s(),
			u = (n && n[3]) || (w.cssNumber[t] ? '' : 'px'),
			c =
				e.nodeType &&
				(w.cssNumber[t] || ('px' !== u && +l)) &&
				te.exec(w.css(e, t));
		if (c && c[3] !== u) {
			for (u = u || c[3], c = +(l /= 2) || 1; a--; )
				w.style(e, t, c + u),
					(1 - o) * (1 - (o = s() / l || 0.5)) <= 0 && (a = 0),
					(c /= o);
			w.style(e, t, (c *= 2) + u), (n = n || []);
		}
		return (
			n &&
				((c = +c || +l || 0),
				(r = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
				i && ((i.unit = u), (i.start = c), (i.end = r))),
			r
		);
	}
	var le = {};
	function ue(e, t) {
		for (var n, i, r, o, a, s, l, u = [], c = 0, f = e.length; c < f; c++)
			(i = e[c]).style &&
				((n = i.style.display),
				t
					? ('none' === n &&
							((u[c] = Y.get(i, 'display') || null),
							u[c] || (i.style.display = '')),
					  '' === i.style.display &&
							ae(i) &&
							(u[c] =
								((l = a = o = void 0),
								(a = (r = i).ownerDocument),
								(l = le[(s = r.nodeName)]) ||
									((o = a.body.appendChild(
										a.createElement(s)
									)),
									(l = w.css(o, 'display')),
									o.parentNode.removeChild(o),
									'none' === l && (l = 'block'),
									(le[s] = l)))))
					: 'none' !== n &&
					  ((u[c] = 'none'), Y.set(i, 'display', n)));
		for (c = 0; c < f; c++) null != u[c] && (e[c].style.display = u[c]);
		return e;
	}
	w.fn.extend({
		show: function () {
			return ue(this, !0);
		},
		hide: function () {
			return ue(this);
		},
		toggle: function (e) {
			return 'boolean' == typeof e
				? e
					? this.show()
					: this.hide()
				: this.each(function () {
						ae(this) ? w(this).show() : w(this).hide();
				  });
		},
	});
	var ce,
		fe,
		de = /^(?:checkbox|radio)$/i,
		he = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
		pe = /^$|^module$|\/(?:java|ecma)script/i;
	(ce = m.createDocumentFragment().appendChild(m.createElement('div'))),
		(fe = m.createElement('input')).setAttribute('type', 'radio'),
		fe.setAttribute('checked', 'checked'),
		fe.setAttribute('name', 't'),
		ce.appendChild(fe),
		(h.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked),
		(ce.innerHTML = '<textarea>x</textarea>'),
		(h.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue),
		(ce.innerHTML = '<option></option>'),
		(h.option = !!ce.lastChild);
	var ge = {
		thead: [1, '<table>', '</table>'],
		col: [2, '<table><colgroup>', '</colgroup></table>'],
		tr: [2, '<table><tbody>', '</tbody></table>'],
		td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
		_default: [0, '', ''],
	};
	function me(e, t) {
		var n;
		return (
			(n =
				void 0 !== e.getElementsByTagName
					? e.getElementsByTagName(t || '*')
					: void 0 !== e.querySelectorAll
					? e.querySelectorAll(t || '*')
					: []),
			void 0 === t || (t && k(e, t)) ? w.merge([e], n) : n
		);
	}
	function ve(e, t) {
		for (var n = 0, i = e.length; n < i; n++)
			Y.set(e[n], 'globalEval', !t || Y.get(t[n], 'globalEval'));
	}
	(ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead),
		(ge.th = ge.td),
		h.option ||
			(ge.optgroup = ge.option = [
				1,
				"<select multiple='multiple'>",
				'</select>',
			]);
	var ye = /<|&#?\w+;/;
	function be(e, t, n, i, r) {
		for (
			var o,
				a,
				s,
				l,
				u,
				c,
				f = t.createDocumentFragment(),
				d = [],
				h = 0,
				p = e.length;
			h < p;
			h++
		)
			if ((o = e[h]) || 0 === o)
				if ('object' === b(o)) w.merge(d, o.nodeType ? [o] : o);
				else if (ye.test(o)) {
					for (
						a = a || f.appendChild(t.createElement('div')),
							s = (he.exec(o) || ['', ''])[1].toLowerCase(),
							a.innerHTML =
								(l = ge[s] || ge._default)[1] +
								w.htmlPrefilter(o) +
								l[2],
							c = l[0];
						c--;

					)
						a = a.lastChild;
					w.merge(d, a.childNodes),
						((a = f.firstChild).textContent = '');
				} else d.push(t.createTextNode(o));
		for (f.textContent = '', h = 0; (o = d[h++]); )
			if (i && -1 < w.inArray(o, i)) r && r.push(o);
			else if (
				((u = re(o)),
				(a = me(f.appendChild(o), 'script')),
				u && ve(a),
				n)
			)
				for (c = 0; (o = a[c++]); ) pe.test(o.type || '') && n.push(o);
		return f;
	}
	var _e = /^key/,
		we = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		Te = /^([^.]*)(?:\.(.+)|)/;
	function Ee() {
		return !0;
	}
	function xe() {
		return !1;
	}
	function Ce(e, t) {
		return (
			(e ===
				(function () {
					try {
						return m.activeElement;
					} catch (e) {}
				})()) ==
			('focus' === t)
		);
	}
	function Se(e, t, n, i, r, o) {
		var a, s;
		if ('object' == typeof t) {
			for (s in ('string' != typeof n && ((i = i || n), (n = void 0)), t))
				Se(e, s, n, i, t[s], o);
			return e;
		}
		if (
			(null == i && null == r
				? ((r = n), (i = n = void 0))
				: null == r &&
				  ('string' == typeof n
						? ((r = i), (i = void 0))
						: ((r = i), (i = n), (n = void 0))),
			!1 === r)
		)
			r = xe;
		else if (!r) return e;
		return (
			1 === o &&
				((a = r),
				((r = function (e) {
					return w().off(e), a.apply(this, arguments);
				}).guid = a.guid || (a.guid = w.guid++))),
			e.each(function () {
				w.event.add(this, t, r, i, n);
			})
		);
	}
	function ke(e, t, n) {
		n
			? (Y.set(e, t, !1),
			  w.event.add(e, t, {
					namespace: !1,
					handler: function (e) {
						var i,
							o,
							a = Y.get(this, t);
						if (1 & e.isTrigger && this[t]) {
							if (a.length)
								(w.event.special[t] || {}).delegateType &&
									e.stopPropagation();
							else if (
								((a = r.call(arguments)),
								Y.set(this, t, a),
								(i = n(this, t)),
								this[t](),
								a !== (o = Y.get(this, t)) || i
									? Y.set(this, t, !1)
									: (o = {}),
								a !== o)
							)
								return (
									e.stopImmediatePropagation(),
									e.preventDefault(),
									o.value
								);
						} else
							a.length &&
								(Y.set(this, t, {
									value: w.event.trigger(
										w.extend(a[0], w.Event.prototype),
										a.slice(1),
										this
									),
								}),
								e.stopImmediatePropagation());
					},
			  }))
			: void 0 === Y.get(e, t) && w.event.add(e, t, Ee);
	}
	(w.event = {
		global: {},
		add: function (e, t, n, i, r) {
			var o,
				a,
				s,
				l,
				u,
				c,
				f,
				d,
				h,
				p,
				g,
				m = Y.get(e);
			if (V(e))
				for (
					n.handler && ((n = (o = n).handler), (r = o.selector)),
						r && w.find.matchesSelector(ie, r),
						n.guid || (n.guid = w.guid++),
						(l = m.events) || (l = m.events = Object.create(null)),
						(a = m.handle) ||
							(a = m.handle = function (t) {
								return void 0 !== w &&
									w.event.triggered !== t.type
									? w.event.dispatch.apply(e, arguments)
									: void 0;
							}),
						u = (t = (t || '').match(L) || ['']).length;
					u--;

				)
					(h = g = (s = Te.exec(t[u]) || [])[1]),
						(p = (s[2] || '').split('.').sort()),
						h &&
							((f = w.event.special[h] || {}),
							(f =
								w.event.special[
									(h = (r ? f.delegateType : f.bindType) || h)
								] || {}),
							(c = w.extend(
								{
									type: h,
									origType: g,
									data: i,
									handler: n,
									guid: n.guid,
									selector: r,
									needsContext:
										r && w.expr.match.needsContext.test(r),
									namespace: p.join('.'),
								},
								o
							)),
							(d = l[h]) ||
								(((d = l[h] = []).delegateCount = 0),
								(f.setup && !1 !== f.setup.call(e, i, p, a)) ||
									(e.addEventListener &&
										e.addEventListener(h, a))),
							f.add &&
								(f.add.call(e, c),
								c.handler.guid || (c.handler.guid = n.guid)),
							r ? d.splice(d.delegateCount++, 0, c) : d.push(c),
							(w.event.global[h] = !0));
		},
		remove: function (e, t, n, i, r) {
			var o,
				a,
				s,
				l,
				u,
				c,
				f,
				d,
				h,
				p,
				g,
				m = Y.hasData(e) && Y.get(e);
			if (m && (l = m.events)) {
				for (u = (t = (t || '').match(L) || ['']).length; u--; )
					if (
						((h = g = (s = Te.exec(t[u]) || [])[1]),
						(p = (s[2] || '').split('.').sort()),
						h)
					) {
						for (
							f = w.event.special[h] || {},
								d =
									l[
										(h =
											(i ? f.delegateType : f.bindType) ||
											h)
									] || [],
								s =
									s[2] &&
									new RegExp(
										'(^|\\.)' +
											p.join('\\.(?:.*\\.|)') +
											'(\\.|$)'
									),
								a = o = d.length;
							o--;

						)
							(c = d[o]),
								(!r && g !== c.origType) ||
									(n && n.guid !== c.guid) ||
									(s && !s.test(c.namespace)) ||
									(i &&
										i !== c.selector &&
										('**' !== i || !c.selector)) ||
									(d.splice(o, 1),
									c.selector && d.delegateCount--,
									f.remove && f.remove.call(e, c));
						a &&
							!d.length &&
							((f.teardown &&
								!1 !== f.teardown.call(e, p, m.handle)) ||
								w.removeEvent(e, h, m.handle),
							delete l[h]);
					} else for (h in l) w.event.remove(e, h + t[u], n, i, !0);
				w.isEmptyObject(l) && Y.remove(e, 'handle events');
			}
		},
		dispatch: function (e) {
			var t,
				n,
				i,
				r,
				o,
				a,
				s = new Array(arguments.length),
				l = w.event.fix(e),
				u =
					(Y.get(this, 'events') || Object.create(null))[l.type] ||
					[],
				c = w.event.special[l.type] || {};
			for (s[0] = l, t = 1; t < arguments.length; t++)
				s[t] = arguments[t];
			if (
				((l.delegateTarget = this),
				!c.preDispatch || !1 !== c.preDispatch.call(this, l))
			) {
				for (
					a = w.event.handlers.call(this, l, u), t = 0;
					(r = a[t++]) && !l.isPropagationStopped();

				)
					for (
						l.currentTarget = r.elem, n = 0;
						(o = r.handlers[n++]) &&
						!l.isImmediatePropagationStopped();

					)
						(l.rnamespace &&
							!1 !== o.namespace &&
							!l.rnamespace.test(o.namespace)) ||
							((l.handleObj = o),
							(l.data = o.data),
							void 0 !==
								(i = (
									(w.event.special[o.origType] || {})
										.handle || o.handler
								).apply(r.elem, s)) &&
								!1 === (l.result = i) &&
								(l.preventDefault(), l.stopPropagation()));
				return c.postDispatch && c.postDispatch.call(this, l), l.result;
			}
		},
		handlers: function (e, t) {
			var n,
				i,
				r,
				o,
				a,
				s = [],
				l = t.delegateCount,
				u = e.target;
			if (l && u.nodeType && !('click' === e.type && 1 <= e.button))
				for (; u !== this; u = u.parentNode || this)
					if (
						1 === u.nodeType &&
						('click' !== e.type || !0 !== u.disabled)
					) {
						for (o = [], a = {}, n = 0; n < l; n++)
							void 0 === a[(r = (i = t[n]).selector + ' ')] &&
								(a[r] = i.needsContext
									? -1 < w(r, this).index(u)
									: w.find(r, this, null, [u]).length),
								a[r] && o.push(i);
						o.length && s.push({ elem: u, handlers: o });
					}
			return (
				(u = this),
				l < t.length && s.push({ elem: u, handlers: t.slice(l) }),
				s
			);
		},
		addProp: function (e, t) {
			Object.defineProperty(w.Event.prototype, e, {
				enumerable: !0,
				configurable: !0,
				get: p(t)
					? function () {
							if (this.originalEvent)
								return t(this.originalEvent);
					  }
					: function () {
							if (this.originalEvent)
								return this.originalEvent[e];
					  },
				set: function (t) {
					Object.defineProperty(this, e, {
						enumerable: !0,
						configurable: !0,
						writable: !0,
						value: t,
					});
				},
			});
		},
		fix: function (e) {
			return e[w.expando] ? e : new w.Event(e);
		},
		special: {
			load: { noBubble: !0 },
			click: {
				setup: function (e) {
					var t = this || e;
					return (
						de.test(t.type) &&
							t.click &&
							k(t, 'input') &&
							ke(t, 'click', Ee),
						!1
					);
				},
				trigger: function (e) {
					var t = this || e;
					return (
						de.test(t.type) &&
							t.click &&
							k(t, 'input') &&
							ke(t, 'click'),
						!0
					);
				},
				_default: function (e) {
					var t = e.target;
					return (
						(de.test(t.type) &&
							t.click &&
							k(t, 'input') &&
							Y.get(t, 'click')) ||
						k(t, 'a')
					);
				},
			},
			beforeunload: {
				postDispatch: function (e) {
					void 0 !== e.result &&
						e.originalEvent &&
						(e.originalEvent.returnValue = e.result);
				},
			},
		},
	}),
		(w.removeEvent = function (e, t, n) {
			e.removeEventListener && e.removeEventListener(t, n);
		}),
		(w.Event = function (e, t) {
			if (!(this instanceof w.Event)) return new w.Event(e, t);
			e && e.type
				? ((this.originalEvent = e),
				  (this.type = e.type),
				  (this.isDefaultPrevented =
						e.defaultPrevented ||
						(void 0 === e.defaultPrevented && !1 === e.returnValue)
							? Ee
							: xe),
				  (this.target =
						e.target && 3 === e.target.nodeType
							? e.target.parentNode
							: e.target),
				  (this.currentTarget = e.currentTarget),
				  (this.relatedTarget = e.relatedTarget))
				: (this.type = e),
				t && w.extend(this, t),
				(this.timeStamp = (e && e.timeStamp) || Date.now()),
				(this[w.expando] = !0);
		}),
		(w.Event.prototype = {
			constructor: w.Event,
			isDefaultPrevented: xe,
			isPropagationStopped: xe,
			isImmediatePropagationStopped: xe,
			isSimulated: !1,
			preventDefault: function () {
				var e = this.originalEvent;
				(this.isDefaultPrevented = Ee),
					e && !this.isSimulated && e.preventDefault();
			},
			stopPropagation: function () {
				var e = this.originalEvent;
				(this.isPropagationStopped = Ee),
					e && !this.isSimulated && e.stopPropagation();
			},
			stopImmediatePropagation: function () {
				var e = this.originalEvent;
				(this.isImmediatePropagationStopped = Ee),
					e && !this.isSimulated && e.stopImmediatePropagation(),
					this.stopPropagation();
			},
		}),
		w.each(
			{
				altKey: !0,
				bubbles: !0,
				cancelable: !0,
				changedTouches: !0,
				ctrlKey: !0,
				detail: !0,
				eventPhase: !0,
				metaKey: !0,
				pageX: !0,
				pageY: !0,
				shiftKey: !0,
				view: !0,
				char: !0,
				code: !0,
				charCode: !0,
				key: !0,
				keyCode: !0,
				button: !0,
				buttons: !0,
				clientX: !0,
				clientY: !0,
				offsetX: !0,
				offsetY: !0,
				pointerId: !0,
				pointerType: !0,
				screenX: !0,
				screenY: !0,
				targetTouches: !0,
				toElement: !0,
				touches: !0,
				which: function (e) {
					var t = e.button;
					return null == e.which && _e.test(e.type)
						? null != e.charCode
							? e.charCode
							: e.keyCode
						: !e.which && void 0 !== t && we.test(e.type)
						? 1 & t
							? 1
							: 2 & t
							? 3
							: 4 & t
							? 2
							: 0
						: e.which;
				},
			},
			w.event.addProp
		),
		w.each({ focus: 'focusin', blur: 'focusout' }, function (e, t) {
			w.event.special[e] = {
				setup: function () {
					return ke(this, e, Ce), !1;
				},
				trigger: function () {
					return ke(this, e), !0;
				},
				delegateType: t,
			};
		}),
		w.each(
			{
				mouseenter: 'mouseover',
				mouseleave: 'mouseout',
				pointerenter: 'pointerover',
				pointerleave: 'pointerout',
			},
			function (e, t) {
				w.event.special[e] = {
					delegateType: t,
					bindType: t,
					handle: function (e) {
						var n,
							i = e.relatedTarget,
							r = e.handleObj;
						return (
							(i && (i === this || w.contains(this, i))) ||
								((e.type = r.origType),
								(n = r.handler.apply(this, arguments)),
								(e.type = t)),
							n
						);
					},
				};
			}
		),
		w.fn.extend({
			on: function (e, t, n, i) {
				return Se(this, e, t, n, i);
			},
			one: function (e, t, n, i) {
				return Se(this, e, t, n, i, 1);
			},
			off: function (e, t, n) {
				var i, r;
				if (e && e.preventDefault && e.handleObj)
					return (
						(i = e.handleObj),
						w(e.delegateTarget).off(
							i.namespace
								? i.origType + '.' + i.namespace
								: i.origType,
							i.selector,
							i.handler
						),
						this
					);
				if ('object' == typeof e) {
					for (r in e) this.off(r, t, e[r]);
					return this;
				}
				return (
					(!1 !== t && 'function' != typeof t) ||
						((n = t), (t = void 0)),
					!1 === n && (n = xe),
					this.each(function () {
						w.event.remove(this, e, n, t);
					})
				);
			},
		});
	var Ae = /<script|<style|<link/i,
		De = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	function je(e, t) {
		return (
			(k(e, 'table') &&
				k(11 !== t.nodeType ? t : t.firstChild, 'tr') &&
				w(e).children('tbody')[0]) ||
			e
		);
	}
	function Ie(e) {
		return (e.type = (null !== e.getAttribute('type')) + '/' + e.type), e;
	}
	function Oe(e) {
		return (
			'true/' === (e.type || '').slice(0, 5)
				? (e.type = e.type.slice(5))
				: e.removeAttribute('type'),
			e
		);
	}
	function qe(e, t) {
		var n, i, r, o, a, s;
		if (1 === t.nodeType) {
			if (Y.hasData(e) && (s = Y.get(e).events))
				for (r in (Y.remove(t, 'handle events'), s))
					for (n = 0, i = s[r].length; n < i; n++)
						w.event.add(t, r, s[r][n]);
			K.hasData(e) &&
				((o = K.access(e)), (a = w.extend({}, o)), K.set(t, a));
		}
	}
	function Le(e, t, n, i) {
		t = o(t);
		var r,
			a,
			s,
			l,
			u,
			c,
			f = 0,
			d = e.length,
			g = d - 1,
			m = t[0],
			v = p(m);
		if (v || (1 < d && 'string' == typeof m && !h.checkClone && De.test(m)))
			return e.each(function (r) {
				var o = e.eq(r);
				v && (t[0] = m.call(this, r, o.html())), Le(o, t, n, i);
			});
		if (
			d &&
			((a = (r = be(t, e[0].ownerDocument, !1, e, i)).firstChild),
			1 === r.childNodes.length && (r = a),
			a || i)
		) {
			for (l = (s = w.map(me(r, 'script'), Ie)).length; f < d; f++)
				(u = r),
					f !== g &&
						((u = w.clone(u, !0, !0)),
						l && w.merge(s, me(u, 'script'))),
					n.call(e[f], u, f);
			if (l)
				for (
					c = s[s.length - 1].ownerDocument, w.map(s, Oe), f = 0;
					f < l;
					f++
				)
					pe.test((u = s[f]).type || '') &&
						!Y.access(u, 'globalEval') &&
						w.contains(c, u) &&
						(u.src && 'module' !== (u.type || '').toLowerCase()
							? w._evalUrl &&
							  !u.noModule &&
							  w._evalUrl(
									u.src,
									{
										nonce:
											u.nonce || u.getAttribute('nonce'),
									},
									c
							  )
							: y(u.textContent.replace(Ne, ''), u, c));
		}
		return e;
	}
	function Pe(e, t, n) {
		for (var i, r = t ? w.filter(t, e) : e, o = 0; null != (i = r[o]); o++)
			n || 1 !== i.nodeType || w.cleanData(me(i)),
				i.parentNode &&
					(n && re(i) && ve(me(i, 'script')),
					i.parentNode.removeChild(i));
		return e;
	}
	w.extend({
		htmlPrefilter: function (e) {
			return e;
		},
		clone: function (e, t, n) {
			var i,
				r,
				o,
				a,
				s,
				l,
				u,
				c = e.cloneNode(!0),
				f = re(e);
			if (
				!(
					h.noCloneChecked ||
					(1 !== e.nodeType && 11 !== e.nodeType) ||
					w.isXMLDoc(e)
				)
			)
				for (a = me(c), i = 0, r = (o = me(e)).length; i < r; i++)
					(s = o[i]),
						'input' === (u = (l = a[i]).nodeName.toLowerCase()) &&
						de.test(s.type)
							? (l.checked = s.checked)
							: ('input' !== u && 'textarea' !== u) ||
							  (l.defaultValue = s.defaultValue);
			if (t)
				if (n)
					for (
						o = o || me(e), a = a || me(c), i = 0, r = o.length;
						i < r;
						i++
					)
						qe(o[i], a[i]);
				else qe(e, c);
			return (
				0 < (a = me(c, 'script')).length &&
					ve(a, !f && me(e, 'script')),
				c
			);
		},
		cleanData: function (e) {
			for (
				var t, n, i, r = w.event.special, o = 0;
				void 0 !== (n = e[o]);
				o++
			)
				if (V(n)) {
					if ((t = n[Y.expando])) {
						if (t.events)
							for (i in t.events)
								r[i]
									? w.event.remove(n, i)
									: w.removeEvent(n, i, t.handle);
						n[Y.expando] = void 0;
					}
					n[K.expando] && (n[K.expando] = void 0);
				}
		},
	}),
		w.fn.extend({
			detach: function (e) {
				return Pe(this, e, !0);
			},
			remove: function (e) {
				return Pe(this, e);
			},
			text: function (e) {
				return B(
					this,
					function (e) {
						return void 0 === e
							? w.text(this)
							: this.empty().each(function () {
									(1 !== this.nodeType &&
										11 !== this.nodeType &&
										9 !== this.nodeType) ||
										(this.textContent = e);
							  });
					},
					null,
					e,
					arguments.length
				);
			},
			append: function () {
				return Le(this, arguments, function (e) {
					(1 !== this.nodeType &&
						11 !== this.nodeType &&
						9 !== this.nodeType) ||
						je(this, e).appendChild(e);
				});
			},
			prepend: function () {
				return Le(this, arguments, function (e) {
					if (
						1 === this.nodeType ||
						11 === this.nodeType ||
						9 === this.nodeType
					) {
						var t = je(this, e);
						t.insertBefore(e, t.firstChild);
					}
				});
			},
			before: function () {
				return Le(this, arguments, function (e) {
					this.parentNode && this.parentNode.insertBefore(e, this);
				});
			},
			after: function () {
				return Le(this, arguments, function (e) {
					this.parentNode &&
						this.parentNode.insertBefore(e, this.nextSibling);
				});
			},
			empty: function () {
				for (var e, t = 0; null != (e = this[t]); t++)
					1 === e.nodeType &&
						(w.cleanData(me(e, !1)), (e.textContent = ''));
				return this;
			},
			clone: function (e, t) {
				return (
					(e = null != e && e),
					(t = null == t ? e : t),
					this.map(function () {
						return w.clone(this, e, t);
					})
				);
			},
			html: function (e) {
				return B(
					this,
					function (e) {
						var t = this[0] || {},
							n = 0,
							i = this.length;
						if (void 0 === e && 1 === t.nodeType)
							return t.innerHTML;
						if (
							'string' == typeof e &&
							!Ae.test(e) &&
							!ge[(he.exec(e) || ['', ''])[1].toLowerCase()]
						) {
							e = w.htmlPrefilter(e);
							try {
								for (; n < i; n++)
									1 === (t = this[n] || {}).nodeType &&
										(w.cleanData(me(t, !1)),
										(t.innerHTML = e));
								t = 0;
							} catch (e) {}
						}
						t && this.empty().append(e);
					},
					null,
					e,
					arguments.length
				);
			},
			replaceWith: function () {
				var e = [];
				return Le(
					this,
					arguments,
					function (t) {
						var n = this.parentNode;
						w.inArray(this, e) < 0 &&
							(w.cleanData(me(this)),
							n && n.replaceChild(t, this));
					},
					e
				);
			},
		}),
		w.each(
			{
				appendTo: 'append',
				prependTo: 'prepend',
				insertBefore: 'before',
				insertAfter: 'after',
				replaceAll: 'replaceWith',
			},
			function (e, t) {
				w.fn[e] = function (e) {
					for (
						var n, i = [], r = w(e), o = r.length - 1, s = 0;
						s <= o;
						s++
					)
						(n = s === o ? this : this.clone(!0)),
							w(r[s])[t](n),
							a.apply(i, n.get());
					return this.pushStack(i);
				};
			}
		);
	var Re = new RegExp('^(' + ee + ')(?!px)[a-z%]+$', 'i'),
		He = function (t) {
			var n = t.ownerDocument.defaultView;
			return (n && n.opener) || (n = e), n.getComputedStyle(t);
		},
		Fe = function (e, t, n) {
			var i,
				r,
				o = {};
			for (r in t) (o[r] = e.style[r]), (e.style[r] = t[r]);
			for (r in ((i = n.call(e)), t)) e.style[r] = o[r];
			return i;
		},
		Me = new RegExp(ne.join('|'), 'i');
	function $e(e, t, n) {
		var i,
			r,
			o,
			a,
			s = e.style;
		return (
			(n = n || He(e)) &&
				('' !== (a = n.getPropertyValue(t) || n[t]) ||
					re(e) ||
					(a = w.style(e, t)),
				!h.pixelBoxStyles() &&
					Re.test(a) &&
					Me.test(t) &&
					((i = s.width),
					(r = s.minWidth),
					(o = s.maxWidth),
					(s.minWidth = s.maxWidth = s.width = a),
					(a = n.width),
					(s.width = i),
					(s.minWidth = r),
					(s.maxWidth = o))),
			void 0 !== a ? a + '' : a
		);
	}
	function Be(e, t) {
		return {
			get: function () {
				if (!e()) return (this.get = t).apply(this, arguments);
				delete this.get;
			},
		};
	}
	!(function () {
		function t() {
			if (c) {
				(u.style.cssText =
					'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
					(c.style.cssText =
						'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
					ie.appendChild(u).appendChild(c);
				var t = e.getComputedStyle(c);
				(i = '1%' !== t.top),
					(l = 12 === n(t.marginLeft)),
					(c.style.right = '60%'),
					(a = 36 === n(t.right)),
					(r = 36 === n(t.width)),
					(c.style.position = 'absolute'),
					(o = 12 === n(c.offsetWidth / 3)),
					ie.removeChild(u),
					(c = null);
			}
		}
		function n(e) {
			return Math.round(parseFloat(e));
		}
		var i,
			r,
			o,
			a,
			s,
			l,
			u = m.createElement('div'),
			c = m.createElement('div');
		c.style &&
			((c.style.backgroundClip = 'content-box'),
			(c.cloneNode(!0).style.backgroundClip = ''),
			(h.clearCloneStyle = 'content-box' === c.style.backgroundClip),
			w.extend(h, {
				boxSizingReliable: function () {
					return t(), r;
				},
				pixelBoxStyles: function () {
					return t(), a;
				},
				pixelPosition: function () {
					return t(), i;
				},
				reliableMarginLeft: function () {
					return t(), l;
				},
				scrollboxSize: function () {
					return t(), o;
				},
				reliableTrDimensions: function () {
					var t, n, i, r;
					return (
						null == s &&
							((t = m.createElement('table')),
							(n = m.createElement('tr')),
							(i = m.createElement('div')),
							(t.style.cssText =
								'position:absolute;left:-11111px'),
							(n.style.height = '1px'),
							(i.style.height = '9px'),
							ie.appendChild(t).appendChild(n).appendChild(i),
							(r = e.getComputedStyle(n)),
							(s = 3 < parseInt(r.height)),
							ie.removeChild(t)),
						s
					);
				},
			}));
	})();
	var We = ['Webkit', 'Moz', 'ms'],
		Ue = m.createElement('div').style,
		Qe = {};
	function ze(e) {
		return (
			w.cssProps[e] ||
			Qe[e] ||
			(e in Ue
				? e
				: (Qe[e] =
						(function (e) {
							for (
								var t = e[0].toUpperCase() + e.slice(1),
									n = We.length;
								n--;

							)
								if ((e = We[n] + t) in Ue) return e;
						})(e) || e))
		);
	}
	var Ve = /^(none|table(?!-c[ea]).+)/,
		Xe = /^--/,
		Ye = { position: 'absolute', visibility: 'hidden', display: 'block' },
		Ke = { letterSpacing: '0', fontWeight: '400' };
	function Ge(e, t, n) {
		var i = te.exec(t);
		return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || 'px') : t;
	}
	function Je(e, t, n, i, r, o) {
		var a = 'width' === t ? 1 : 0,
			s = 0,
			l = 0;
		if (n === (i ? 'border' : 'content')) return 0;
		for (; a < 4; a += 2)
			'margin' === n && (l += w.css(e, n + ne[a], !0, r)),
				i
					? ('content' === n &&
							(l -= w.css(e, 'padding' + ne[a], !0, r)),
					  'margin' !== n &&
							(l -= w.css(e, 'border' + ne[a] + 'Width', !0, r)))
					: ((l += w.css(e, 'padding' + ne[a], !0, r)),
					  'padding' !== n
							? (l += w.css(e, 'border' + ne[a] + 'Width', !0, r))
							: (s += w.css(
									e,
									'border' + ne[a] + 'Width',
									!0,
									r
							  )));
		return (
			!i &&
				0 <= o &&
				(l +=
					Math.max(
						0,
						Math.ceil(
							e['offset' + t[0].toUpperCase() + t.slice(1)] -
								o -
								l -
								s -
								0.5
						)
					) || 0),
			l
		);
	}
	function Ze(e, t, n) {
		var i = He(e),
			r =
				(!h.boxSizingReliable() || n) &&
				'border-box' === w.css(e, 'boxSizing', !1, i),
			o = r,
			a = $e(e, t, i),
			s = 'offset' + t[0].toUpperCase() + t.slice(1);
		if (Re.test(a)) {
			if (!n) return a;
			a = 'auto';
		}
		return (
			((!h.boxSizingReliable() && r) ||
				(!h.reliableTrDimensions() && k(e, 'tr')) ||
				'auto' === a ||
				(!parseFloat(a) && 'inline' === w.css(e, 'display', !1, i))) &&
				e.getClientRects().length &&
				((r = 'border-box' === w.css(e, 'boxSizing', !1, i)),
				(o = s in e) && (a = e[s])),
			(a = parseFloat(a) || 0) +
				Je(e, t, n || (r ? 'border' : 'content'), o, i, a) +
				'px'
		);
	}
	function et(e, t, n, i, r) {
		return new et.prototype.init(e, t, n, i, r);
	}
	w.extend({
		cssHooks: {
			opacity: {
				get: function (e, t) {
					if (t) {
						var n = $e(e, 'opacity');
						return '' === n ? '1' : n;
					}
				},
			},
		},
		cssNumber: {
			animationIterationCount: !0,
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			gridArea: !0,
			gridColumn: !0,
			gridColumnEnd: !0,
			gridColumnStart: !0,
			gridRow: !0,
			gridRowEnd: !0,
			gridRowStart: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0,
		},
		cssProps: {},
		style: function (e, t, n, i) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var r,
					o,
					a,
					s = z(t),
					l = Xe.test(t),
					u = e.style;
				if (
					(l || (t = ze(s)),
					(a = w.cssHooks[t] || w.cssHooks[s]),
					void 0 === n)
				)
					return a && 'get' in a && void 0 !== (r = a.get(e, !1, i))
						? r
						: u[t];
				'string' == (o = typeof n) &&
					(r = te.exec(n)) &&
					r[1] &&
					((n = se(e, t, r)), (o = 'number')),
					null != n &&
						n == n &&
						('number' !== o ||
							l ||
							(n += (r && r[3]) || (w.cssNumber[s] ? '' : 'px')),
						h.clearCloneStyle ||
							'' !== n ||
							0 !== t.indexOf('background') ||
							(u[t] = 'inherit'),
						(a && 'set' in a && void 0 === (n = a.set(e, n, i))) ||
							(l ? u.setProperty(t, n) : (u[t] = n)));
			}
		},
		css: function (e, t, n, i) {
			var r,
				o,
				a,
				s = z(t);
			return (
				Xe.test(t) || (t = ze(s)),
				(a = w.cssHooks[t] || w.cssHooks[s]) &&
					'get' in a &&
					(r = a.get(e, !0, n)),
				void 0 === r && (r = $e(e, t, i)),
				'normal' === r && t in Ke && (r = Ke[t]),
				'' === n || n
					? ((o = parseFloat(r)),
					  !0 === n || isFinite(o) ? o || 0 : r)
					: r
			);
		},
	}),
		w.each(['height', 'width'], function (e, t) {
			w.cssHooks[t] = {
				get: function (e, n, i) {
					if (n)
						return !Ve.test(w.css(e, 'display')) ||
							(e.getClientRects().length &&
								e.getBoundingClientRect().width)
							? Ze(e, t, i)
							: Fe(e, Ye, function () {
									return Ze(e, t, i);
							  });
				},
				set: function (e, n, i) {
					var r,
						o = He(e),
						a = !h.scrollboxSize() && 'absolute' === o.position,
						s =
							(a || i) &&
							'border-box' === w.css(e, 'boxSizing', !1, o),
						l = i ? Je(e, t, i, s, o) : 0;
					return (
						s &&
							a &&
							(l -= Math.ceil(
								e['offset' + t[0].toUpperCase() + t.slice(1)] -
									parseFloat(o[t]) -
									Je(e, t, 'border', !1, o) -
									0.5
							)),
						l &&
							(r = te.exec(n)) &&
							'px' !== (r[3] || 'px') &&
							((e.style[t] = n), (n = w.css(e, t))),
						Ge(0, n, l)
					);
				},
			};
		}),
		(w.cssHooks.marginLeft = Be(h.reliableMarginLeft, function (e, t) {
			if (t)
				return (
					(parseFloat($e(e, 'marginLeft')) ||
						e.getBoundingClientRect().left -
							Fe(e, { marginLeft: 0 }, function () {
								return e.getBoundingClientRect().left;
							})) + 'px'
				);
		})),
		w.each({ margin: '', padding: '', border: 'Width' }, function (e, t) {
			(w.cssHooks[e + t] = {
				expand: function (n) {
					for (
						var i = 0,
							r = {},
							o = 'string' == typeof n ? n.split(' ') : [n];
						i < 4;
						i++
					)
						r[e + ne[i] + t] = o[i] || o[i - 2] || o[0];
					return r;
				},
			}),
				'margin' !== e && (w.cssHooks[e + t].set = Ge);
		}),
		w.fn.extend({
			css: function (e, t) {
				return B(
					this,
					function (e, t, n) {
						var i,
							r,
							o = {},
							a = 0;
						if (Array.isArray(t)) {
							for (i = He(e), r = t.length; a < r; a++)
								o[t[a]] = w.css(e, t[a], !1, i);
							return o;
						}
						return void 0 !== n ? w.style(e, t, n) : w.css(e, t);
					},
					e,
					t,
					1 < arguments.length
				);
			},
		}),
		(((w.Tween = et).prototype = {
			constructor: et,
			init: function (e, t, n, i, r, o) {
				(this.elem = e),
					(this.prop = n),
					(this.easing = r || w.easing._default),
					(this.options = t),
					(this.start = this.now = this.cur()),
					(this.end = i),
					(this.unit = o || (w.cssNumber[n] ? '' : 'px'));
			},
			cur: function () {
				var e = et.propHooks[this.prop];
				return e && e.get
					? e.get(this)
					: et.propHooks._default.get(this);
			},
			run: function (e) {
				var t,
					n = et.propHooks[this.prop];
				return (
					(this.pos = t = this.options.duration
						? w.easing[this.easing](
								e,
								this.options.duration * e,
								0,
								1,
								this.options.duration
						  )
						: e),
					(this.now = (this.end - this.start) * t + this.start),
					this.options.step &&
						this.options.step.call(this.elem, this.now, this),
					n && n.set ? n.set(this) : et.propHooks._default.set(this),
					this
				);
			},
		}).init.prototype = et.prototype),
		((et.propHooks = {
			_default: {
				get: function (e) {
					var t;
					return 1 !== e.elem.nodeType ||
						(null != e.elem[e.prop] && null == e.elem.style[e.prop])
						? e.elem[e.prop]
						: (t = w.css(e.elem, e.prop, '')) && 'auto' !== t
						? t
						: 0;
				},
				set: function (e) {
					w.fx.step[e.prop]
						? w.fx.step[e.prop](e)
						: 1 !== e.elem.nodeType ||
						  (!w.cssHooks[e.prop] &&
								null == e.elem.style[ze(e.prop)])
						? (e.elem[e.prop] = e.now)
						: w.style(e.elem, e.prop, e.now + e.unit);
				},
			},
		}).scrollTop = et.propHooks.scrollLeft = {
			set: function (e) {
				e.elem.nodeType &&
					e.elem.parentNode &&
					(e.elem[e.prop] = e.now);
			},
		}),
		(w.easing = {
			linear: function (e) {
				return e;
			},
			swing: function (e) {
				return 0.5 - Math.cos(e * Math.PI) / 2;
			},
			_default: 'swing',
		}),
		(w.fx = et.prototype.init),
		(w.fx.step = {});
	var tt,
		nt,
		it,
		rt,
		ot = /^(?:toggle|show|hide)$/,
		at = /queueHooks$/;
	function st() {
		nt &&
			(!1 === m.hidden && e.requestAnimationFrame
				? e.requestAnimationFrame(st)
				: e.setTimeout(st, w.fx.interval),
			w.fx.tick());
	}
	function lt() {
		return (
			e.setTimeout(function () {
				tt = void 0;
			}),
			(tt = Date.now())
		);
	}
	function ut(e, t) {
		var n,
			i = 0,
			r = { height: e };
		for (t = t ? 1 : 0; i < 4; i += 2 - t)
			r['margin' + (n = ne[i])] = r['padding' + n] = e;
		return t && (r.opacity = r.width = e), r;
	}
	function ct(e, t, n) {
		for (
			var i,
				r = (ft.tweeners[t] || []).concat(ft.tweeners['*']),
				o = 0,
				a = r.length;
			o < a;
			o++
		)
			if ((i = r[o].call(n, t, e))) return i;
	}
	function ft(e, t, n) {
		var i,
			r,
			o = 0,
			a = ft.prefilters.length,
			s = w.Deferred().always(function () {
				delete l.elem;
			}),
			l = function () {
				if (r) return !1;
				for (
					var t = tt || lt(),
						n = Math.max(0, u.startTime + u.duration - t),
						i = 1 - (n / u.duration || 0),
						o = 0,
						a = u.tweens.length;
					o < a;
					o++
				)
					u.tweens[o].run(i);
				return (
					s.notifyWith(e, [u, i, n]),
					i < 1 && a
						? n
						: (a || s.notifyWith(e, [u, 1, 0]),
						  s.resolveWith(e, [u]),
						  !1)
				);
			},
			u = s.promise({
				elem: e,
				props: w.extend({}, t),
				opts: w.extend(
					!0,
					{ specialEasing: {}, easing: w.easing._default },
					n
				),
				originalProperties: t,
				originalOptions: n,
				startTime: tt || lt(),
				duration: n.duration,
				tweens: [],
				createTween: function (t, n) {
					var i = w.Tween(
						e,
						u.opts,
						t,
						n,
						u.opts.specialEasing[t] || u.opts.easing
					);
					return u.tweens.push(i), i;
				},
				stop: function (t) {
					var n = 0,
						i = t ? u.tweens.length : 0;
					if (r) return this;
					for (r = !0; n < i; n++) u.tweens[n].run(1);
					return (
						t
							? (s.notifyWith(e, [u, 1, 0]),
							  s.resolveWith(e, [u, t]))
							: s.rejectWith(e, [u, t]),
						this
					);
				},
			}),
			c = u.props;
		for (
			(function (e, t) {
				var n, i, r, o, a;
				for (n in e)
					if (
						((r = t[(i = z(n))]),
						(o = e[n]),
						Array.isArray(o) && ((r = o[1]), (o = e[n] = o[0])),
						n !== i && ((e[i] = o), delete e[n]),
						(a = w.cssHooks[i]) && ('expand' in a))
					)
						for (n in ((o = a.expand(o)), delete e[i], o))
							(n in e) || ((e[n] = o[n]), (t[n] = r));
					else t[i] = r;
			})(c, u.opts.specialEasing);
			o < a;
			o++
		)
			if ((i = ft.prefilters[o].call(u, e, c, u.opts)))
				return (
					p(i.stop) &&
						(w._queueHooks(u.elem, u.opts.queue).stop = i.stop.bind(
							i
						)),
					i
				);
		return (
			w.map(c, ct, u),
			p(u.opts.start) && u.opts.start.call(e, u),
			u
				.progress(u.opts.progress)
				.done(u.opts.done, u.opts.complete)
				.fail(u.opts.fail)
				.always(u.opts.always),
			w.fx.timer(w.extend(l, { elem: e, anim: u, queue: u.opts.queue })),
			u
		);
	}
	(w.Animation = w.extend(ft, {
		tweeners: {
			'*': [
				function (e, t) {
					var n = this.createTween(e, t);
					return se(n.elem, e, te.exec(t), n), n;
				},
			],
		},
		tweener: function (e, t) {
			p(e) ? ((t = e), (e = ['*'])) : (e = e.match(L));
			for (var n, i = 0, r = e.length; i < r; i++)
				(ft.tweeners[(n = e[i])] = ft.tweeners[n] || []).unshift(t);
		},
		prefilters: [
			function (e, t, n) {
				var i,
					r,
					o,
					a,
					s,
					l,
					u,
					c,
					f = 'width' in t || 'height' in t,
					d = this,
					h = {},
					p = e.style,
					g = e.nodeType && ae(e),
					m = Y.get(e, 'fxshow');
				for (i in (n.queue ||
					(null == (a = w._queueHooks(e, 'fx')).unqueued &&
						((a.unqueued = 0),
						(s = a.empty.fire),
						(a.empty.fire = function () {
							a.unqueued || s();
						})),
					a.unqueued++,
					d.always(function () {
						d.always(function () {
							a.unqueued--,
								w.queue(e, 'fx').length || a.empty.fire();
						});
					})),
				t))
					if (ot.test((r = t[i]))) {
						if (
							(delete t[i],
							(o = o || 'toggle' === r),
							r === (g ? 'hide' : 'show'))
						) {
							if ('show' !== r || !m || void 0 === m[i]) continue;
							g = !0;
						}
						h[i] = (m && m[i]) || w.style(e, i);
					}
				if ((l = !w.isEmptyObject(t)) || !w.isEmptyObject(h))
					for (i in (f &&
						1 === e.nodeType &&
						((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
						null == (u = m && m.display) &&
							(u = Y.get(e, 'display')),
						'none' === (c = w.css(e, 'display')) &&
							(u
								? (c = u)
								: (ue([e], !0),
								  (u = e.style.display || u),
								  (c = w.css(e, 'display')),
								  ue([e]))),
						('inline' === c ||
							('inline-block' === c && null != u)) &&
							'none' === w.css(e, 'float') &&
							(l ||
								(d.done(function () {
									p.display = u;
								}),
								null == u &&
									(u = 'none' === (c = p.display) ? '' : c)),
							(p.display = 'inline-block'))),
					n.overflow &&
						((p.overflow = 'hidden'),
						d.always(function () {
							(p.overflow = n.overflow[0]),
								(p.overflowX = n.overflow[1]),
								(p.overflowY = n.overflow[2]);
						})),
					(l = !1),
					h))
						l ||
							(m
								? 'hidden' in m && (g = m.hidden)
								: (m = Y.access(e, 'fxshow', { display: u })),
							o && (m.hidden = !g),
							g && ue([e], !0),
							d.done(function () {
								for (i in (g || ue([e]),
								Y.remove(e, 'fxshow'),
								h))
									w.style(e, i, h[i]);
							})),
							(l = ct(g ? m[i] : 0, i, d)),
							i in m ||
								((m[i] = l.start),
								g && ((l.end = l.start), (l.start = 0)));
			},
		],
		prefilter: function (e, t) {
			t ? ft.prefilters.unshift(e) : ft.prefilters.push(e);
		},
	})),
		(w.speed = function (e, t, n) {
			var i =
				e && 'object' == typeof e
					? w.extend({}, e)
					: {
							complete: n || (!n && t) || (p(e) && e),
							duration: e,
							easing: (n && t) || (t && !p(t) && t),
					  };
			return (
				w.fx.off
					? (i.duration = 0)
					: 'number' != typeof i.duration &&
					  (i.duration =
							i.duration in w.fx.speeds
								? w.fx.speeds[i.duration]
								: w.fx.speeds._default),
				(null != i.queue && !0 !== i.queue) || (i.queue = 'fx'),
				(i.old = i.complete),
				(i.complete = function () {
					p(i.old) && i.old.call(this),
						i.queue && w.dequeue(this, i.queue);
				}),
				i
			);
		}),
		w.fn.extend({
			fadeTo: function (e, t, n, i) {
				return this.filter(ae)
					.css('opacity', 0)
					.show()
					.end()
					.animate({ opacity: t }, e, n, i);
			},
			animate: function (e, t, n, i) {
				var r = w.isEmptyObject(e),
					o = w.speed(t, n, i),
					a = function () {
						var t = ft(this, w.extend({}, e), o);
						(r || Y.get(this, 'finish')) && t.stop(!0);
					};
				return (
					(a.finish = a),
					r || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
				);
			},
			stop: function (e, t, n) {
				var i = function (e) {
					var t = e.stop;
					delete e.stop, t(n);
				};
				return (
					'string' != typeof e && ((n = t), (t = e), (e = void 0)),
					t && this.queue(e || 'fx', []),
					this.each(function () {
						var t = !0,
							r = null != e && e + 'queueHooks',
							o = w.timers,
							a = Y.get(this);
						if (r) a[r] && a[r].stop && i(a[r]);
						else
							for (r in a)
								a[r] && a[r].stop && at.test(r) && i(a[r]);
						for (r = o.length; r--; )
							o[r].elem !== this ||
								(null != e && o[r].queue !== e) ||
								(o[r].anim.stop(n), (t = !1), o.splice(r, 1));
						(!t && n) || w.dequeue(this, e);
					})
				);
			},
			finish: function (e) {
				return (
					!1 !== e && (e = e || 'fx'),
					this.each(function () {
						var t,
							n = Y.get(this),
							i = n[e + 'queue'],
							r = n[e + 'queueHooks'],
							o = w.timers,
							a = i ? i.length : 0;
						for (
							n.finish = !0,
								w.queue(this, e, []),
								r && r.stop && r.stop.call(this, !0),
								t = o.length;
							t--;

						)
							o[t].elem === this &&
								o[t].queue === e &&
								(o[t].anim.stop(!0), o.splice(t, 1));
						for (t = 0; t < a; t++)
							i[t] && i[t].finish && i[t].finish.call(this);
						delete n.finish;
					})
				);
			},
		}),
		w.each(['toggle', 'show', 'hide'], function (e, t) {
			var n = w.fn[t];
			w.fn[t] = function (e, i, r) {
				return null == e || 'boolean' == typeof e
					? n.apply(this, arguments)
					: this.animate(ut(t, !0), e, i, r);
			};
		}),
		w.each(
			{
				slideDown: ut('show'),
				slideUp: ut('hide'),
				slideToggle: ut('toggle'),
				fadeIn: { opacity: 'show' },
				fadeOut: { opacity: 'hide' },
				fadeToggle: { opacity: 'toggle' },
			},
			function (e, t) {
				w.fn[e] = function (e, n, i) {
					return this.animate(t, e, n, i);
				};
			}
		),
		(w.timers = []),
		(w.fx.tick = function () {
			var e,
				t = 0,
				n = w.timers;
			for (tt = Date.now(); t < n.length; t++)
				(e = n[t])() || n[t] !== e || n.splice(t--, 1);
			n.length || w.fx.stop(), (tt = void 0);
		}),
		(w.fx.timer = function (e) {
			w.timers.push(e), w.fx.start();
		}),
		(w.fx.interval = 13),
		(w.fx.start = function () {
			nt || ((nt = !0), st());
		}),
		(w.fx.stop = function () {
			nt = null;
		}),
		(w.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
		(w.fn.delay = function (t, n) {
			return (
				(t = (w.fx && w.fx.speeds[t]) || t),
				this.queue((n = n || 'fx'), function (n, i) {
					var r = e.setTimeout(n, t);
					i.stop = function () {
						e.clearTimeout(r);
					};
				})
			);
		}),
		(it = m.createElement('input')),
		(rt = m.createElement('select').appendChild(m.createElement('option'))),
		(it.type = 'checkbox'),
		(h.checkOn = '' !== it.value),
		(h.optSelected = rt.selected),
		((it = m.createElement('input')).value = 't'),
		(it.type = 'radio'),
		(h.radioValue = 't' === it.value);
	var dt,
		ht = w.expr.attrHandle;
	w.fn.extend({
		attr: function (e, t) {
			return B(this, w.attr, e, t, 1 < arguments.length);
		},
		removeAttr: function (e) {
			return this.each(function () {
				w.removeAttr(this, e);
			});
		},
	}),
		w.extend({
			attr: function (e, t, n) {
				var i,
					r,
					o = e.nodeType;
				if (3 !== o && 8 !== o && 2 !== o)
					return void 0 === e.getAttribute
						? w.prop(e, t, n)
						: ((1 === o && w.isXMLDoc(e)) ||
								(r =
									w.attrHooks[t.toLowerCase()] ||
									(w.expr.match.bool.test(t) ? dt : void 0)),
						  void 0 !== n
								? null === n
									? void w.removeAttr(e, t)
									: r &&
									  'set' in r &&
									  void 0 !== (i = r.set(e, n, t))
									? i
									: (e.setAttribute(t, n + ''), n)
								: r && 'get' in r && null !== (i = r.get(e, t))
								? i
								: null == (i = w.find.attr(e, t))
								? void 0
								: i);
			},
			attrHooks: {
				type: {
					set: function (e, t) {
						if (!h.radioValue && 'radio' === t && k(e, 'input')) {
							var n = e.value;
							return (
								e.setAttribute('type', t), n && (e.value = n), t
							);
						}
					},
				},
			},
			removeAttr: function (e, t) {
				var n,
					i = 0,
					r = t && t.match(L);
				if (r && 1 === e.nodeType)
					for (; (n = r[i++]); ) e.removeAttribute(n);
			},
		}),
		(dt = {
			set: function (e, t, n) {
				return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n), n;
			},
		}),
		w.each(w.expr.match.bool.source.match(/\w+/g), function (e, t) {
			var n = ht[t] || w.find.attr;
			ht[t] = function (e, t, i) {
				var r,
					o,
					a = t.toLowerCase();
				return (
					i ||
						((o = ht[a]),
						(ht[a] = r),
						(r = null != n(e, t, i) ? a : null),
						(ht[a] = o)),
					r
				);
			};
		});
	var pt = /^(?:input|select|textarea|button)$/i,
		gt = /^(?:a|area)$/i;
	function mt(e) {
		return (e.match(L) || []).join(' ');
	}
	function vt(e) {
		return (e.getAttribute && e.getAttribute('class')) || '';
	}
	function yt(e) {
		return Array.isArray(e)
			? e
			: ('string' == typeof e && e.match(L)) || [];
	}
	w.fn.extend({
		prop: function (e, t) {
			return B(this, w.prop, e, t, 1 < arguments.length);
		},
		removeProp: function (e) {
			return this.each(function () {
				delete this[w.propFix[e] || e];
			});
		},
	}),
		w.extend({
			prop: function (e, t, n) {
				var i,
					r,
					o = e.nodeType;
				if (3 !== o && 8 !== o && 2 !== o)
					return (
						(1 === o && w.isXMLDoc(e)) ||
							(r = w.propHooks[(t = w.propFix[t] || t)]),
						void 0 !== n
							? r && 'set' in r && void 0 !== (i = r.set(e, n, t))
								? i
								: (e[t] = n)
							: r && 'get' in r && null !== (i = r.get(e, t))
							? i
							: e[t]
					);
			},
			propHooks: {
				tabIndex: {
					get: function (e) {
						var t = w.find.attr(e, 'tabindex');
						return t
							? parseInt(t, 10)
							: pt.test(e.nodeName) ||
							  (gt.test(e.nodeName) && e.href)
							? 0
							: -1;
					},
				},
			},
			propFix: { for: 'htmlFor', class: 'className' },
		}),
		h.optSelected ||
			(w.propHooks.selected = {
				get: function (e) {
					return null;
				},
				set: function (e) {},
			}),
		w.each(
			[
				'tabIndex',
				'readOnly',
				'maxLength',
				'cellSpacing',
				'cellPadding',
				'rowSpan',
				'colSpan',
				'useMap',
				'frameBorder',
				'contentEditable',
			],
			function () {
				w.propFix[this.toLowerCase()] = this;
			}
		),
		w.fn.extend({
			addClass: function (e) {
				var t,
					n,
					i,
					r,
					o,
					a,
					s,
					l = 0;
				if (p(e))
					return this.each(function (t) {
						w(this).addClass(e.call(this, t, vt(this)));
					});
				if ((t = yt(e)).length)
					for (; (n = this[l++]); )
						if (
							((r = vt(n)),
							(i = 1 === n.nodeType && ' ' + mt(r) + ' '))
						) {
							for (a = 0; (o = t[a++]); )
								i.indexOf(' ' + o + ' ') < 0 && (i += o + ' ');
							r !== (s = mt(i)) && n.setAttribute('class', s);
						}
				return this;
			},
			removeClass: function (e) {
				var t,
					n,
					i,
					r,
					o,
					a,
					s,
					l = 0;
				if (p(e))
					return this.each(function (t) {
						w(this).removeClass(e.call(this, t, vt(this)));
					});
				if (!arguments.length) return this.attr('class', '');
				if ((t = yt(e)).length)
					for (; (n = this[l++]); )
						if (
							((r = vt(n)),
							(i = 1 === n.nodeType && ' ' + mt(r) + ' '))
						) {
							for (a = 0; (o = t[a++]); )
								for (; -1 < i.indexOf(' ' + o + ' '); )
									i = i.replace(' ' + o + ' ', ' ');
							r !== (s = mt(i)) && n.setAttribute('class', s);
						}
				return this;
			},
			toggleClass: function (e, t) {
				var n = typeof e,
					i = 'string' === n || Array.isArray(e);
				return 'boolean' == typeof t && i
					? t
						? this.addClass(e)
						: this.removeClass(e)
					: p(e)
					? this.each(function (n) {
							w(this).toggleClass(
								e.call(this, n, vt(this), t),
								t
							);
					  })
					: this.each(function () {
							var t, r, o, a;
							if (i)
								for (
									r = 0, o = w(this), a = yt(e);
									(t = a[r++]);

								)
									o.hasClass(t)
										? o.removeClass(t)
										: o.addClass(t);
							else
								(void 0 !== e && 'boolean' !== n) ||
									((t = vt(this)) &&
										Y.set(this, '__className__', t),
									this.setAttribute &&
										this.setAttribute(
											'class',
											t || !1 === e
												? ''
												: Y.get(
														this,
														'__className__'
												  ) || ''
										));
					  });
			},
			hasClass: function (e) {
				var t,
					n,
					i = 0;
				for (t = ' ' + e + ' '; (n = this[i++]); )
					if (
						1 === n.nodeType &&
						-1 < (' ' + mt(vt(n)) + ' ').indexOf(t)
					)
						return !0;
				return !1;
			},
		});
	var bt = /\r/g;
	w.fn.extend({
		val: function (e) {
			var t,
				n,
				i,
				r = this[0];
			return arguments.length
				? ((i = p(e)),
				  this.each(function (n) {
						var r;
						1 === this.nodeType &&
							(null ==
							(r = i ? e.call(this, n, w(this).val()) : e)
								? (r = '')
								: 'number' == typeof r
								? (r += '')
								: Array.isArray(r) &&
								  (r = w.map(r, function (e) {
										return null == e ? '' : e + '';
								  })),
							((t =
								w.valHooks[this.type] ||
								w.valHooks[this.nodeName.toLowerCase()]) &&
								'set' in t &&
								void 0 !== t.set(this, r, 'value')) ||
								(this.value = r));
				  }))
				: r
				? (t =
						w.valHooks[r.type] ||
						w.valHooks[r.nodeName.toLowerCase()]) &&
				  'get' in t &&
				  void 0 !== (n = t.get(r, 'value'))
					? n
					: 'string' == typeof (n = r.value)
					? n.replace(bt, '')
					: null == n
					? ''
					: n
				: void 0;
		},
	}),
		w.extend({
			valHooks: {
				option: {
					get: function (e) {
						var t = w.find.attr(e, 'value');
						return null != t ? t : mt(w.text(e));
					},
				},
				select: {
					get: function (e) {
						var t,
							n,
							i,
							r = e.options,
							o = e.selectedIndex,
							a = 'select-one' === e.type,
							s = a ? null : [],
							l = a ? o + 1 : r.length;
						for (i = o < 0 ? l : a ? o : 0; i < l; i++)
							if (
								((n = r[i]).selected || i === o) &&
								!n.disabled &&
								(!n.parentNode.disabled ||
									!k(n.parentNode, 'optgroup'))
							) {
								if (((t = w(n).val()), a)) return t;
								s.push(t);
							}
						return s;
					},
					set: function (e, t) {
						for (
							var n,
								i,
								r = e.options,
								o = w.makeArray(t),
								a = r.length;
							a--;

						)
							((i = r[a]).selected =
								-1 < w.inArray(w.valHooks.option.get(i), o)) &&
								(n = !0);
						return n || (e.selectedIndex = -1), o;
					},
				},
			},
		}),
		w.each(['radio', 'checkbox'], function () {
			(w.valHooks[this] = {
				set: function (e, t) {
					if (Array.isArray(t))
						return (e.checked = -1 < w.inArray(w(e).val(), t));
				},
			}),
				h.checkOn ||
					(w.valHooks[this].get = function (e) {
						return null === e.getAttribute('value')
							? 'on'
							: e.value;
					});
		}),
		(h.focusin = 'onfocusin' in e);
	var _t = /^(?:focusinfocus|focusoutblur)$/,
		wt = function (e) {
			e.stopPropagation();
		};
	w.extend(w.event, {
		trigger: function (t, n, i, r) {
			var o,
				a,
				s,
				l,
				u,
				f,
				d,
				h,
				v = [i || m],
				y = c.call(t, 'type') ? t.type : t,
				b = c.call(t, 'namespace') ? t.namespace.split('.') : [];
			if (
				((a = h = s = i = i || m),
				3 !== i.nodeType &&
					8 !== i.nodeType &&
					!_t.test(y + w.event.triggered) &&
					(-1 < y.indexOf('.') &&
						((y = (b = y.split('.')).shift()), b.sort()),
					(u = y.indexOf(':') < 0 && 'on' + y),
					((t = t[w.expando]
						? t
						: new w.Event(
								y,
								'object' == typeof t && t
						  )).isTrigger = r ? 2 : 3),
					(t.namespace = b.join('.')),
					(t.rnamespace = t.namespace
						? new RegExp(
								'(^|\\.)' + b.join('\\.(?:.*\\.|)') + '(\\.|$)'
						  )
						: null),
					(t.result = void 0),
					t.target || (t.target = i),
					(n = null == n ? [t] : w.makeArray(n, [t])),
					(d = w.event.special[y] || {}),
					r || !d.trigger || !1 !== d.trigger.apply(i, n)))
			) {
				if (!r && !d.noBubble && !g(i)) {
					for (
						_t.test((l = d.delegateType || y) + y) ||
						(a = a.parentNode);
						a;
						a = a.parentNode
					)
						v.push(a), (s = a);
					s === (i.ownerDocument || m) &&
						v.push(s.defaultView || s.parentWindow || e);
				}
				for (o = 0; (a = v[o++]) && !t.isPropagationStopped(); )
					(h = a),
						(t.type = 1 < o ? l : d.bindType || y),
						(f =
							(Y.get(a, 'events') || Object.create(null))[
								t.type
							] && Y.get(a, 'handle')) && f.apply(a, n),
						(f = u && a[u]) &&
							f.apply &&
							V(a) &&
							((t.result = f.apply(a, n)),
							!1 === t.result && t.preventDefault());
				return (
					(t.type = y),
					r ||
						t.isDefaultPrevented() ||
						(d._default && !1 !== d._default.apply(v.pop(), n)) ||
						!V(i) ||
						(u &&
							p(i[y]) &&
							!g(i) &&
							((s = i[u]) && (i[u] = null),
							(w.event.triggered = y),
							t.isPropagationStopped() &&
								h.addEventListener(y, wt),
							i[y](),
							t.isPropagationStopped() &&
								h.removeEventListener(y, wt),
							(w.event.triggered = void 0),
							s && (i[u] = s))),
					t.result
				);
			}
		},
		simulate: function (e, t, n) {
			var i = w.extend(new w.Event(), n, { type: e, isSimulated: !0 });
			w.event.trigger(i, null, t);
		},
	}),
		w.fn.extend({
			trigger: function (e, t) {
				return this.each(function () {
					w.event.trigger(e, t, this);
				});
			},
			triggerHandler: function (e, t) {
				var n = this[0];
				if (n) return w.event.trigger(e, t, n, !0);
			},
		}),
		h.focusin ||
			w.each({ focus: 'focusin', blur: 'focusout' }, function (e, t) {
				var n = function (e) {
					w.event.simulate(t, e.target, w.event.fix(e));
				};
				w.event.special[t] = {
					setup: function () {
						var i = this.ownerDocument || this.document || this,
							r = Y.access(i, t);
						r || i.addEventListener(e, n, !0),
							Y.access(i, t, (r || 0) + 1);
					},
					teardown: function () {
						var i = this.ownerDocument || this.document || this,
							r = Y.access(i, t) - 1;
						r
							? Y.access(i, t, r)
							: (i.removeEventListener(e, n, !0), Y.remove(i, t));
					},
				};
			});
	var Tt = e.location,
		Et = { guid: Date.now() },
		xt = /\?/;
	w.parseXML = function (t) {
		var n;
		if (!t || 'string' != typeof t) return null;
		try {
			n = new e.DOMParser().parseFromString(t, 'text/xml');
		} catch (t) {
			n = void 0;
		}
		return (
			(n && !n.getElementsByTagName('parsererror').length) ||
				w.error('Invalid XML: ' + t),
			n
		);
	};
	var Ct = /\[\]$/,
		St = /\r?\n/g,
		kt = /^(?:submit|button|image|reset|file)$/i,
		At = /^(?:input|select|textarea|keygen)/i;
	function Dt(e, t, n, i) {
		var r;
		if (Array.isArray(t))
			w.each(t, function (t, r) {
				n || Ct.test(e)
					? i(e, r)
					: Dt(
							e +
								'[' +
								('object' == typeof r && null != r ? t : '') +
								']',
							r,
							n,
							i
					  );
			});
		else if (n || 'object' !== b(t)) i(e, t);
		else for (r in t) Dt(e + '[' + r + ']', t[r], n, i);
	}
	(w.param = function (e, t) {
		var n,
			i = [],
			r = function (e, t) {
				var n = p(t) ? t() : t;
				i[i.length] =
					encodeURIComponent(e) +
					'=' +
					encodeURIComponent(null == n ? '' : n);
			};
		if (null == e) return '';
		if (Array.isArray(e) || (e.jquery && !w.isPlainObject(e)))
			w.each(e, function () {
				r(this.name, this.value);
			});
		else for (n in e) Dt(n, e[n], t, r);
		return i.join('&');
	}),
		w.fn.extend({
			serialize: function () {
				return w.param(this.serializeArray());
			},
			serializeArray: function () {
				return this.map(function () {
					var e = w.prop(this, 'elements');
					return e ? w.makeArray(e) : this;
				})
					.filter(function () {
						var e = this.type;
						return (
							this.name &&
							!w(this).is(':disabled') &&
							At.test(this.nodeName) &&
							!kt.test(e) &&
							(this.checked || !de.test(e))
						);
					})
					.map(function (e, t) {
						var n = w(this).val();
						return null == n
							? null
							: Array.isArray(n)
							? w.map(n, function (e) {
									return {
										name: t.name,
										value: e.replace(St, '\r\n'),
									};
							  })
							: { name: t.name, value: n.replace(St, '\r\n') };
					})
					.get();
			},
		});
	var Nt = /%20/g,
		jt = /#.*$/,
		It = /([?&])_=[^&]*/,
		Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
		qt = /^(?:GET|HEAD)$/,
		Lt = /^\/\//,
		Pt = {},
		Rt = {},
		Ht = '*/'.concat('*'),
		Ft = m.createElement('a');
	function Mt(e) {
		return function (t, n) {
			'string' != typeof t && ((n = t), (t = '*'));
			var i,
				r = 0,
				o = t.toLowerCase().match(L) || [];
			if (p(n))
				for (; (i = o[r++]); )
					'+' === i[0]
						? ((i = i.slice(1) || '*'),
						  (e[i] = e[i] || []).unshift(n))
						: (e[i] = e[i] || []).push(n);
		};
	}
	function $t(e, t, n, i) {
		var r = {},
			o = e === Rt;
		function a(s) {
			var l;
			return (
				(r[s] = !0),
				w.each(e[s] || [], function (e, s) {
					var u = s(t, n, i);
					return 'string' != typeof u || o || r[u]
						? o
							? !(l = u)
							: void 0
						: (t.dataTypes.unshift(u), a(u), !1);
				}),
				l
			);
		}
		return a(t.dataTypes[0]) || (!r['*'] && a('*'));
	}
	function Bt(e, t) {
		var n,
			i,
			r = w.ajaxSettings.flatOptions || {};
		for (n in t) void 0 !== t[n] && ((r[n] ? e : i || (i = {}))[n] = t[n]);
		return i && w.extend(!0, e, i), e;
	}
	(Ft.href = Tt.href),
		w.extend({
			active: 0,
			lastModified: {},
			etag: {},
			ajaxSettings: {
				url: Tt.href,
				type: 'GET',
				isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
					Tt.protocol
				),
				global: !0,
				processData: !0,
				async: !0,
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				accepts: {
					'*': Ht,
					text: 'text/plain',
					html: 'text/html',
					xml: 'application/xml, text/xml',
					json: 'application/json, text/javascript',
				},
				contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
				responseFields: {
					xml: 'responseXML',
					text: 'responseText',
					json: 'responseJSON',
				},
				converters: {
					'* text': String,
					'text html': !0,
					'text json': JSON.parse,
					'text xml': w.parseXML,
				},
				flatOptions: { url: !0, context: !0 },
			},
			ajaxSetup: function (e, t) {
				return t ? Bt(Bt(e, w.ajaxSettings), t) : Bt(w.ajaxSettings, e);
			},
			ajaxPrefilter: Mt(Pt),
			ajaxTransport: Mt(Rt),
			ajax: function (t, n) {
				'object' == typeof t && ((n = t), (t = void 0));
				var i,
					r,
					o,
					a,
					s,
					l,
					u,
					c,
					f,
					d,
					h = w.ajaxSetup({}, (n = n || {})),
					p = h.context || h,
					g = h.context && (p.nodeType || p.jquery) ? w(p) : w.event,
					v = w.Deferred(),
					y = w.Callbacks('once memory'),
					b = h.statusCode || {},
					_ = {},
					T = {},
					E = 'canceled',
					x = {
						readyState: 0,
						getResponseHeader: function (e) {
							var t;
							if (u) {
								if (!a)
									for (a = {}; (t = Ot.exec(o)); )
										a[t[1].toLowerCase() + ' '] = (
											a[t[1].toLowerCase() + ' '] || []
										).concat(t[2]);
								t = a[e.toLowerCase() + ' '];
							}
							return null == t ? null : t.join(', ');
						},
						getAllResponseHeaders: function () {
							return u ? o : null;
						},
						setRequestHeader: function (e, t) {
							return (
								null == u &&
									((e = T[e.toLowerCase()] =
										T[e.toLowerCase()] || e),
									(_[e] = t)),
								this
							);
						},
						overrideMimeType: function (e) {
							return null == u && (h.mimeType = e), this;
						},
						statusCode: function (e) {
							var t;
							if (e)
								if (u) x.always(e[x.status]);
								else for (t in e) b[t] = [b[t], e[t]];
							return this;
						},
						abort: function (e) {
							var t = e || E;
							return i && i.abort(t), C(0, t), this;
						},
					};
				if (
					(v.promise(x),
					(h.url = ((t || h.url || Tt.href) + '').replace(
						Lt,
						Tt.protocol + '//'
					)),
					(h.type = n.method || n.type || h.method || h.type),
					(h.dataTypes = (h.dataType || '*')
						.toLowerCase()
						.match(L) || ['']),
					null == h.crossDomain)
				) {
					l = m.createElement('a');
					try {
						(l.href = h.url),
							(l.href = l.href),
							(h.crossDomain =
								Ft.protocol + '//' + Ft.host !=
								l.protocol + '//' + l.host);
					} catch (t) {
						h.crossDomain = !0;
					}
				}
				if (
					(h.data &&
						h.processData &&
						'string' != typeof h.data &&
						(h.data = w.param(h.data, h.traditional)),
					$t(Pt, h, n, x),
					u)
				)
					return x;
				for (f in ((c = w.event && h.global) &&
					0 == w.active++ &&
					w.event.trigger('ajaxStart'),
				(h.type = h.type.toUpperCase()),
				(h.hasContent = !qt.test(h.type)),
				(r = h.url.replace(jt, '')),
				h.hasContent
					? h.data &&
					  h.processData &&
					  0 ===
							(h.contentType || '').indexOf(
								'application/x-www-form-urlencoded'
							) &&
					  (h.data = h.data.replace(Nt, '+'))
					: ((d = h.url.slice(r.length)),
					  h.data &&
							(h.processData || 'string' == typeof h.data) &&
							((r += (xt.test(r) ? '&' : '?') + h.data),
							delete h.data),
					  !1 === h.cache &&
							((r = r.replace(It, '$1')),
							(d =
								(xt.test(r) ? '&' : '?') +
								'_=' +
								Et.guid++ +
								d)),
					  (h.url = r + d)),
				h.ifModified &&
					(w.lastModified[r] &&
						x.setRequestHeader(
							'If-Modified-Since',
							w.lastModified[r]
						),
					w.etag[r] &&
						x.setRequestHeader('If-None-Match', w.etag[r])),
				((h.data && h.hasContent && !1 !== h.contentType) ||
					n.contentType) &&
					x.setRequestHeader('Content-Type', h.contentType),
				x.setRequestHeader(
					'Accept',
					h.dataTypes[0] && h.accepts[h.dataTypes[0]]
						? h.accepts[h.dataTypes[0]] +
								('*' !== h.dataTypes[0]
									? ', ' + Ht + '; q=0.01'
									: '')
						: h.accepts['*']
				),
				h.headers))
					x.setRequestHeader(f, h.headers[f]);
				if (h.beforeSend && (!1 === h.beforeSend.call(p, x, h) || u))
					return x.abort();
				if (
					((E = 'abort'),
					y.add(h.complete),
					x.done(h.success),
					x.fail(h.error),
					(i = $t(Rt, h, n, x)))
				) {
					if (
						((x.readyState = 1),
						c && g.trigger('ajaxSend', [x, h]),
						u)
					)
						return x;
					h.async &&
						0 < h.timeout &&
						(s = e.setTimeout(function () {
							x.abort('timeout');
						}, h.timeout));
					try {
						(u = !1), i.send(_, C);
					} catch (t) {
						if (u) throw t;
						C(-1, t);
					}
				} else C(-1, 'No Transport');
				function C(t, n, a, l) {
					var f,
						d,
						m,
						_,
						T,
						E = n;
					u ||
						((u = !0),
						s && e.clearTimeout(s),
						(i = void 0),
						(o = l || ''),
						(x.readyState = 0 < t ? 4 : 0),
						(f = (200 <= t && t < 300) || 304 === t),
						a &&
							(_ = (function (e, t, n) {
								for (
									var i,
										r,
										o,
										a,
										s = e.contents,
										l = e.dataTypes;
									'*' === l[0];

								)
									l.shift(),
										void 0 === i &&
											(i =
												e.mimeType ||
												t.getResponseHeader(
													'Content-Type'
												));
								if (i)
									for (r in s)
										if (s[r] && s[r].test(i)) {
											l.unshift(r);
											break;
										}
								if (l[0] in n) o = l[0];
								else {
									for (r in n) {
										if (
											!l[0] ||
											e.converters[r + ' ' + l[0]]
										) {
											o = r;
											break;
										}
										a || (a = r);
									}
									o = o || a;
								}
								if (o) return o !== l[0] && l.unshift(o), n[o];
							})(h, x, a)),
						!f &&
							-1 < w.inArray('script', h.dataTypes) &&
							(h.converters['text script'] = function () {}),
						(_ = (function (e, t, n, i) {
							var r,
								o,
								a,
								s,
								l,
								u = {},
								c = e.dataTypes.slice();
							if (c[1])
								for (a in e.converters)
									u[a.toLowerCase()] = e.converters[a];
							for (o = c.shift(); o; )
								if (
									(e.responseFields[o] &&
										(n[e.responseFields[o]] = t),
									!l &&
										i &&
										e.dataFilter &&
										(t = e.dataFilter(t, e.dataType)),
									(l = o),
									(o = c.shift()))
								)
									if ('*' === o) o = l;
									else if ('*' !== l && l !== o) {
										if (
											!(a = u[l + ' ' + o] || u['* ' + o])
										)
											for (r in u)
												if (
													(s = r.split(' '))[1] ===
														o &&
													(a =
														u[l + ' ' + s[0]] ||
														u['* ' + s[0]])
												) {
													!0 === a
														? (a = u[r])
														: !0 !== u[r] &&
														  ((o = s[0]),
														  c.unshift(s[1]));
													break;
												}
										if (!0 !== a)
											if (a && e.throws) t = a(t);
											else
												try {
													t = a(t);
												} catch (e) {
													return {
														state: 'parsererror',
														error: a
															? e
															: 'No conversion from ' +
															  l +
															  ' to ' +
															  o,
													};
												}
									}
							return { state: 'success', data: t };
						})(h, _, x, f)),
						f
							? (h.ifModified &&
									((T = x.getResponseHeader(
										'Last-Modified'
									)) && (w.lastModified[r] = T),
									(T = x.getResponseHeader('etag')) &&
										(w.etag[r] = T)),
							  204 === t || 'HEAD' === h.type
									? (E = 'nocontent')
									: 304 === t
									? (E = 'notmodified')
									: ((E = _.state),
									  (d = _.data),
									  (f = !(m = _.error))))
							: ((m = E),
							  (!t && E) || ((E = 'error'), t < 0 && (t = 0))),
						(x.status = t),
						(x.statusText = (n || E) + ''),
						f
							? v.resolveWith(p, [d, E, x])
							: v.rejectWith(p, [x, E, m]),
						x.statusCode(b),
						(b = void 0),
						c &&
							g.trigger(f ? 'ajaxSuccess' : 'ajaxError', [
								x,
								h,
								f ? d : m,
							]),
						y.fireWith(p, [x, E]),
						c &&
							(g.trigger('ajaxComplete', [x, h]),
							--w.active || w.event.trigger('ajaxStop')));
				}
				return x;
			},
			getJSON: function (e, t, n) {
				return w.get(e, t, n, 'json');
			},
			getScript: function (e, t) {
				return w.get(e, void 0, t, 'script');
			},
		}),
		w.each(['get', 'post'], function (e, t) {
			w[t] = function (e, n, i, r) {
				return (
					p(n) && ((r = r || i), (i = n), (n = void 0)),
					w.ajax(
						w.extend(
							{
								url: e,
								type: t,
								dataType: r,
								data: n,
								success: i,
							},
							w.isPlainObject(e) && e
						)
					)
				);
			};
		}),
		w.ajaxPrefilter(function (e) {
			var t;
			for (t in e.headers)
				'content-type' === t.toLowerCase() &&
					(e.contentType = e.headers[t] || '');
		}),
		(w._evalUrl = function (e, t, n) {
			return w.ajax({
				url: e,
				type: 'GET',
				dataType: 'script',
				cache: !0,
				async: !1,
				global: !1,
				converters: { 'text script': function () {} },
				dataFilter: function (e) {
					w.globalEval(e, t, n);
				},
			});
		}),
		w.fn.extend({
			wrapAll: function (e) {
				var t;
				return (
					this[0] &&
						(p(e) && (e = e.call(this[0])),
						(t = w(e, this[0].ownerDocument).eq(0).clone(!0)),
						this[0].parentNode && t.insertBefore(this[0]),
						t
							.map(function () {
								for (var e = this; e.firstElementChild; )
									e = e.firstElementChild;
								return e;
							})
							.append(this)),
					this
				);
			},
			wrapInner: function (e) {
				return p(e)
					? this.each(function (t) {
							w(this).wrapInner(e.call(this, t));
					  })
					: this.each(function () {
							var t = w(this),
								n = t.contents();
							n.length ? n.wrapAll(e) : t.append(e);
					  });
			},
			wrap: function (e) {
				var t = p(e);
				return this.each(function (n) {
					w(this).wrapAll(t ? e.call(this, n) : e);
				});
			},
			unwrap: function (e) {
				return (
					this.parent(e)
						.not('body')
						.each(function () {
							w(this).replaceWith(this.childNodes);
						}),
					this
				);
			},
		}),
		(w.expr.pseudos.hidden = function (e) {
			return !w.expr.pseudos.visible(e);
		}),
		(w.expr.pseudos.visible = function (e) {
			return !!(
				e.offsetWidth ||
				e.offsetHeight ||
				e.getClientRects().length
			);
		}),
		(w.ajaxSettings.xhr = function () {
			try {
				return new e.XMLHttpRequest();
			} catch (t) {}
		});
	var Wt = { 0: 200, 1223: 204 },
		Ut = w.ajaxSettings.xhr();
	(h.cors = !!Ut && 'withCredentials' in Ut),
		(h.ajax = Ut = !!Ut),
		w.ajaxTransport(function (t) {
			var n, i;
			if (h.cors || (Ut && !t.crossDomain))
				return {
					send: function (r, o) {
						var a,
							s = t.xhr();
						if (
							(s.open(
								t.type,
								t.url,
								t.async,
								t.username,
								t.password
							),
							t.xhrFields)
						)
							for (a in t.xhrFields) s[a] = t.xhrFields[a];
						for (a in (t.mimeType &&
							s.overrideMimeType &&
							s.overrideMimeType(t.mimeType),
						t.crossDomain ||
							r['X-Requested-With'] ||
							(r['X-Requested-With'] = 'XMLHttpRequest'),
						r))
							s.setRequestHeader(a, r[a]);
						(n = function (e) {
							return function () {
								n &&
									((n = i = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null),
									'abort' === e
										? s.abort()
										: 'error' === e
										? 'number' != typeof s.status
											? o(0, 'error')
											: o(s.status, s.statusText)
										: o(
												Wt[s.status] || s.status,
												s.statusText,
												'text' !==
													(s.responseType ||
														'text') ||
													'string' !=
														typeof s.responseText
													? { binary: s.response }
													: { text: s.responseText },
												s.getAllResponseHeaders()
										  ));
							};
						}),
							(s.onload = n()),
							(i = s.onerror = s.ontimeout = n('error')),
							void 0 !== s.onabort
								? (s.onabort = i)
								: (s.onreadystatechange = function () {
										4 === s.readyState &&
											e.setTimeout(function () {
												n && i();
											});
								  }),
							(n = n('abort'));
						try {
							s.send((t.hasContent && t.data) || null);
						} catch (r) {
							if (n) throw r;
						}
					},
					abort: function () {
						n && n();
					},
				};
		}),
		w.ajaxPrefilter(function (e) {
			e.crossDomain && (e.contents.script = !1);
		}),
		w.ajaxSetup({
			accepts: {
				script:
					'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
			},
			contents: { script: /\b(?:java|ecma)script\b/ },
			converters: {
				'text script': function (e) {
					return w.globalEval(e), e;
				},
			},
		}),
		w.ajaxPrefilter('script', function (e) {
			void 0 === e.cache && (e.cache = !1),
				e.crossDomain && (e.type = 'GET');
		}),
		w.ajaxTransport('script', function (e) {
			var t, n;
			if (e.crossDomain || e.scriptAttrs)
				return {
					send: function (i, r) {
						(t = w('<script>')
							.attr(e.scriptAttrs || {})
							.prop({ charset: e.scriptCharset, src: e.url })
							.on(
								'load error',
								(n = function (e) {
									t.remove(),
										(n = null),
										e &&
											r(
												'error' === e.type ? 404 : 200,
												e.type
											);
								})
							)),
							m.head.appendChild(t[0]);
					},
					abort: function () {
						n && n();
					},
				};
		});
	var Qt,
		zt = [],
		Vt = /(=)\?(?=&|$)|\?\?/;
	w.ajaxSetup({
		jsonp: 'callback',
		jsonpCallback: function () {
			var e = zt.pop() || w.expando + '_' + Et.guid++;
			return (this[e] = !0), e;
		},
	}),
		w.ajaxPrefilter('json jsonp', function (t, n, i) {
			var r,
				o,
				a,
				s =
					!1 !== t.jsonp &&
					(Vt.test(t.url)
						? 'url'
						: 'string' == typeof t.data &&
						  0 ===
								(t.contentType || '').indexOf(
									'application/x-www-form-urlencoded'
								) &&
						  Vt.test(t.data) &&
						  'data');
			if (s || 'jsonp' === t.dataTypes[0])
				return (
					(r = t.jsonpCallback = p(t.jsonpCallback)
						? t.jsonpCallback()
						: t.jsonpCallback),
					s
						? (t[s] = t[s].replace(Vt, '$1' + r))
						: !1 !== t.jsonp &&
						  (t.url +=
								(xt.test(t.url) ? '&' : '?') +
								t.jsonp +
								'=' +
								r),
					(t.converters['script json'] = function () {
						return a || w.error(r + ' was not called'), a[0];
					}),
					(t.dataTypes[0] = 'json'),
					(o = e[r]),
					(e[r] = function () {
						a = arguments;
					}),
					i.always(function () {
						void 0 === o ? w(e).removeProp(r) : (e[r] = o),
							t[r] &&
								((t.jsonpCallback = n.jsonpCallback),
								zt.push(r)),
							a && p(o) && o(a[0]),
							(a = o = void 0);
					}),
					'script'
				);
		}),
		(h.createHTMLDocument =
			(((Qt = m.implementation.createHTMLDocument('').body).innerHTML =
				'<form></form><form></form>'),
			2 === Qt.childNodes.length)),
		(w.parseHTML = function (e, t, n) {
			return 'string' != typeof e
				? []
				: ('boolean' == typeof t && ((n = t), (t = !1)),
				  t ||
						(h.createHTMLDocument
							? (((i = (t = m.implementation.createHTMLDocument(
									''
							  )).createElement('base')).href = m.location.href),
							  t.head.appendChild(i))
							: (t = m)),
				  (o = !n && []),
				  (r = A.exec(e))
						? [t.createElement(r[1])]
						: ((r = be([e], t, o)),
						  o && o.length && w(o).remove(),
						  w.merge([], r.childNodes)));
			var i, r, o;
		}),
		(w.fn.load = function (e, t, n) {
			var i,
				r,
				o,
				a = this,
				s = e.indexOf(' ');
			return (
				-1 < s && ((i = mt(e.slice(s))), (e = e.slice(0, s))),
				p(t)
					? ((n = t), (t = void 0))
					: t && 'object' == typeof t && (r = 'POST'),
				0 < a.length &&
					w
						.ajax({
							url: e,
							type: r || 'GET',
							dataType: 'html',
							data: t,
						})
						.done(function (e) {
							(o = arguments),
								a.html(
									i
										? w('<div>')
												.append(w.parseHTML(e))
												.find(i)
										: e
								);
						})
						.always(
							n &&
								function (e, t) {
									a.each(function () {
										n.apply(
											this,
											o || [e.responseText, t, e]
										);
									});
								}
						),
				this
			);
		}),
		(w.expr.pseudos.animated = function (e) {
			return w.grep(w.timers, function (t) {
				return e === t.elem;
			}).length;
		}),
		(w.offset = {
			setOffset: function (e, t, n) {
				var i,
					r,
					o,
					a,
					s,
					l,
					u = w.css(e, 'position'),
					c = w(e),
					f = {};
				'static' === u && (e.style.position = 'relative'),
					(s = c.offset()),
					(o = w.css(e, 'top')),
					(l = w.css(e, 'left')),
					('absolute' === u || 'fixed' === u) &&
					-1 < (o + l).indexOf('auto')
						? ((a = (i = c.position()).top), (r = i.left))
						: ((a = parseFloat(o) || 0), (r = parseFloat(l) || 0)),
					p(t) && (t = t.call(e, n, w.extend({}, s))),
					null != t.top && (f.top = t.top - s.top + a),
					null != t.left && (f.left = t.left - s.left + r),
					'using' in t
						? t.using.call(e, f)
						: ('number' == typeof f.top && (f.top += 'px'),
						  'number' == typeof f.left && (f.left += 'px'),
						  c.css(f));
			},
		}),
		w.fn.extend({
			offset: function (e) {
				if (arguments.length)
					return void 0 === e
						? this
						: this.each(function (t) {
								w.offset.setOffset(this, e, t);
						  });
				var t,
					n,
					i = this[0];
				return i
					? i.getClientRects().length
						? {
								top:
									(t = i.getBoundingClientRect()).top +
									(n = i.ownerDocument.defaultView)
										.pageYOffset,
								left: t.left + n.pageXOffset,
						  }
						: { top: 0, left: 0 }
					: void 0;
			},
			position: function () {
				if (this[0]) {
					var e,
						t,
						n,
						i = this[0],
						r = { top: 0, left: 0 };
					if ('fixed' === w.css(i, 'position'))
						t = i.getBoundingClientRect();
					else {
						for (
							t = this.offset(),
								n = i.ownerDocument,
								e = i.offsetParent || n.documentElement;
							e &&
							(e === n.body || e === n.documentElement) &&
							'static' === w.css(e, 'position');

						)
							e = e.parentNode;
						e &&
							e !== i &&
							1 === e.nodeType &&
							(((r = w(e).offset()).top += w.css(
								e,
								'borderTopWidth',
								!0
							)),
							(r.left += w.css(e, 'borderLeftWidth', !0)));
					}
					return {
						top: t.top - r.top - w.css(i, 'marginTop', !0),
						left: t.left - r.left - w.css(i, 'marginLeft', !0),
					};
				}
			},
			offsetParent: function () {
				return this.map(function () {
					for (
						var e = this.offsetParent;
						e && 'static' === w.css(e, 'position');

					)
						e = e.offsetParent;
					return e || ie;
				});
			},
		}),
		w.each(
			{ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' },
			function (e, t) {
				var n = 'pageYOffset' === t;
				w.fn[e] = function (i) {
					return B(
						this,
						function (e, i, r) {
							var o;
							if (
								(g(e)
									? (o = e)
									: 9 === e.nodeType && (o = e.defaultView),
								void 0 === r)
							)
								return o ? o[t] : e[i];
							o
								? o.scrollTo(
										n ? o.pageXOffset : r,
										n ? r : o.pageYOffset
								  )
								: (e[i] = r);
						},
						e,
						i,
						arguments.length
					);
				};
			}
		),
		w.each(['top', 'left'], function (e, t) {
			w.cssHooks[t] = Be(h.pixelPosition, function (e, n) {
				if (n)
					return (
						(n = $e(e, t)),
						Re.test(n) ? w(e).position()[t] + 'px' : n
					);
			});
		}),
		w.each({ Height: 'height', Width: 'width' }, function (e, t) {
			w.each(
				{ padding: 'inner' + e, content: t, '': 'outer' + e },
				function (n, i) {
					w.fn[i] = function (r, o) {
						var a =
								arguments.length &&
								(n || 'boolean' != typeof r),
							s =
								n ||
								(!0 === r || !0 === o ? 'margin' : 'border');
						return B(
							this,
							function (t, n, r) {
								var o;
								return g(t)
									? 0 === i.indexOf('outer')
										? t['inner' + e]
										: t.document.documentElement[
												'client' + e
										  ]
									: 9 === t.nodeType
									? ((o = t.documentElement),
									  Math.max(
											t.body['scroll' + e],
											o['scroll' + e],
											t.body['offset' + e],
											o['offset' + e],
											o['client' + e]
									  ))
									: void 0 === r
									? w.css(t, n, s)
									: w.style(t, n, r, s);
							},
							t,
							a ? r : void 0,
							a
						);
					};
				}
			);
		}),
		w.each(
			[
				'ajaxStart',
				'ajaxStop',
				'ajaxComplete',
				'ajaxError',
				'ajaxSuccess',
				'ajaxSend',
			],
			function (e, t) {
				w.fn[t] = function (e) {
					return this.on(t, e);
				};
			}
		),
		w.fn.extend({
			bind: function (e, t, n) {
				return this.on(e, null, t, n);
			},
			unbind: function (e, t) {
				return this.off(e, null, t);
			},
			delegate: function (e, t, n, i) {
				return this.on(t, e, n, i);
			},
			undelegate: function (e, t, n) {
				return 1 === arguments.length
					? this.off(e, '**')
					: this.off(t, e || '**', n);
			},
			hover: function (e, t) {
				return this.mouseenter(e).mouseleave(t || e);
			},
		}),
		w.each(
			'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
				' '
			),
			function (e, t) {
				w.fn[t] = function (e, n) {
					return 0 < arguments.length
						? this.on(t, null, e, n)
						: this.trigger(t);
				};
			}
		);
	var Xt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	(w.proxy = function (e, t) {
		var n, i, o;
		if (('string' == typeof t && ((n = e[t]), (t = e), (e = n)), p(e)))
			return (
				(i = r.call(arguments, 2)),
				((o = function () {
					return e.apply(t || this, i.concat(r.call(arguments)));
				}).guid = e.guid = e.guid || w.guid++),
				o
			);
	}),
		(w.holdReady = function (e) {
			e ? w.readyWait++ : w.ready(!0);
		}),
		(w.isArray = Array.isArray),
		(w.parseJSON = JSON.parse),
		(w.nodeName = k),
		(w.isFunction = p),
		(w.isWindow = g),
		(w.camelCase = z),
		(w.type = b),
		(w.now = Date.now),
		(w.isNumeric = function (e) {
			var t = w.type(e);
			return (
				('number' === t || 'string' === t) && !isNaN(e - parseFloat(e))
			);
		}),
		(w.trim = function (e) {
			return null == e ? '' : (e + '').replace(Xt, '');
		}),
		'function' == typeof define &&
			define.amd &&
			define('jquery', [], function () {
				return w;
			});
	var Yt = e.jQuery,
		Kt = e.$;
	return (
		(w.noConflict = function (t) {
			return (
				e.$ === w && (e.$ = Kt),
				t && e.jQuery === w && (e.jQuery = Yt),
				w
			);
		}),
		void 0 === t && (e.jQuery = e.$ = w),
		w
	);
}),
	(function (e, t) {
		'object' == typeof exports && 'undefined' != typeof module
			? t(exports, require('jquery'), require('popper.js'))
			: 'function' == typeof define && define.amd
			? define(['exports', 'jquery', 'popper.js'], t)
			: t(
					((e =
						'undefined' != typeof globalThis
							? globalThis
							: e || self).bootstrap = {}),
					e.jQuery,
					e.Popper
			  );
	})(this, function (e, t, n) {
		'use strict';
		function i(e) {
			return e && 'object' == typeof e && 'default' in e
				? e
				: { default: e };
		}
		var r = i(t),
			o = i(n);
		function a(e, t) {
			for (var n = 0; n < t.length; n++) {
				var i = t[n];
				(i.enumerable = i.enumerable || !1),
					(i.configurable = !0),
					'value' in i && (i.writable = !0),
					Object.defineProperty(e, i.key, i);
			}
		}
		function s(e, t, n) {
			return t && a(e.prototype, t), n && a(e, n), e;
		}
		function l() {
			return (l =
				Object.assign ||
				function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var i in n)
							Object.prototype.hasOwnProperty.call(n, i) &&
								(e[i] = n[i]);
					}
					return e;
				}).apply(this, arguments);
		}
		var u = {
			TRANSITION_END: 'bsTransitionEnd',
			getUID: function (e) {
				do {
					e += ~~(1e6 * Math.random());
				} while (document.getElementById(e));
				return e;
			},
			getSelectorFromElement: function (e) {
				var t = e.getAttribute('data-target');
				if (!t || '#' === t) {
					var n = e.getAttribute('href');
					t = n && '#' !== n ? n.trim() : '';
				}
				try {
					return document.querySelector(t) ? t : null;
				} catch (e) {
					return null;
				}
			},
			getTransitionDurationFromElement: function (e) {
				if (!e) return 0;
				var t = r.default(e).css('transition-duration'),
					n = r.default(e).css('transition-delay'),
					i = parseFloat(t),
					o = parseFloat(n);
				return i || o
					? ((t = t.split(',')[0]),
					  (n = n.split(',')[0]),
					  1e3 * (parseFloat(t) + parseFloat(n)))
					: 0;
			},
			reflow: function (e) {
				return e.offsetHeight;
			},
			triggerTransitionEnd: function (e) {
				r.default(e).trigger('transitionend');
			},
			supportsTransitionEnd: function () {
				return Boolean('transitionend');
			},
			isElement: function (e) {
				return (e[0] || e).nodeType;
			},
			typeCheckConfig: function (e, t, n) {
				for (var i in n)
					if (Object.prototype.hasOwnProperty.call(n, i)) {
						var r = n[i],
							o = t[i],
							a =
								o && u.isElement(o)
									? 'element'
									: null === (s = o) || void 0 === s
									? '' + s
									: {}.toString
											.call(s)
											.match(/\s([a-z]+)/i)[1]
											.toLowerCase();
						if (!new RegExp(r).test(a))
							throw new Error(
								e.toUpperCase() +
									': Option "' +
									i +
									'" provided type "' +
									a +
									'" but expected type "' +
									r +
									'".'
							);
					}
				var s;
			},
			findShadowRoot: function (e) {
				if (!document.documentElement.attachShadow) return null;
				if ('function' == typeof e.getRootNode) {
					var t = e.getRootNode();
					return t instanceof ShadowRoot ? t : null;
				}
				return e instanceof ShadowRoot
					? e
					: e.parentNode
					? u.findShadowRoot(e.parentNode)
					: null;
			},
			jQueryDetection: function () {
				if (void 0 === r.default)
					throw new TypeError(
						"Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
					);
				var e = r.default.fn.jquery.split(' ')[0].split('.');
				if (
					(e[0] < 2 && e[1] < 9) ||
					(1 === e[0] && 9 === e[1] && e[2] < 1) ||
					e[0] >= 4
				)
					throw new Error(
						"Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
					);
			},
		};
		u.jQueryDetection(),
			(r.default.fn.emulateTransitionEnd = function (e) {
				var t = this,
					n = !1;
				return (
					r.default(this).one(u.TRANSITION_END, function () {
						n = !0;
					}),
					setTimeout(function () {
						n || u.triggerTransitionEnd(t);
					}, e),
					this
				);
			}),
			(r.default.event.special[u.TRANSITION_END] = {
				bindType: 'transitionend',
				delegateType: 'transitionend',
				handle: function (e) {
					if (r.default(e.target).is(this))
						return e.handleObj.handler.apply(this, arguments);
				},
			});
		var c = 'alert',
			f = r.default.fn[c],
			d = (function () {
				function e(e) {
					this._element = e;
				}
				var t = e.prototype;
				return (
					(t.close = function (e) {
						var t = this._element;
						e && (t = this._getRootElement(e)),
							this._triggerCloseEvent(t).isDefaultPrevented() ||
								this._removeElement(t);
					}),
					(t.dispose = function () {
						r.default.removeData(this._element, 'bs.alert'),
							(this._element = null);
					}),
					(t._getRootElement = function (e) {
						var t = u.getSelectorFromElement(e),
							n = !1;
						return (
							t && (n = document.querySelector(t)),
							n || (n = r.default(e).closest('.alert')[0]),
							n
						);
					}),
					(t._triggerCloseEvent = function (e) {
						var t = r.default.Event('close.bs.alert');
						return r.default(e).trigger(t), t;
					}),
					(t._removeElement = function (e) {
						var t = this;
						if (
							(r.default(e).removeClass('show'),
							r.default(e).hasClass('fade'))
						) {
							var n = u.getTransitionDurationFromElement(e);
							r.default(e)
								.one(u.TRANSITION_END, function (n) {
									return t._destroyElement(e, n);
								})
								.emulateTransitionEnd(n);
						} else this._destroyElement(e);
					}),
					(t._destroyElement = function (e) {
						r.default(e)
							.detach()
							.trigger('closed.bs.alert')
							.remove();
					}),
					(e._jQueryInterface = function (t) {
						return this.each(function () {
							var n = r.default(this),
								i = n.data('bs.alert');
							i || ((i = new e(this)), n.data('bs.alert', i)),
								'close' === t && i[t](this);
						});
					}),
					(e._handleDismiss = function (e) {
						return function (t) {
							t && t.preventDefault(), e.close(this);
						};
					}),
					s(e, null, [
						{
							key: 'VERSION',
							get: function () {
								return '4.5.3';
							},
						},
					]),
					e
				);
			})();
		r
			.default(document)
			.on(
				'click.bs.alert.data-api',
				'[data-dismiss="alert"]',
				d._handleDismiss(new d())
			),
			(r.default.fn[c] = d._jQueryInterface),
			(r.default.fn[c].Constructor = d),
			(r.default.fn[c].noConflict = function () {
				return (r.default.fn[c] = f), d._jQueryInterface;
			});
		var h = r.default.fn.button,
			p = (function () {
				function e(e) {
					(this._element = e), (this.shouldAvoidTriggerChange = !1);
				}
				var t = e.prototype;
				return (
					(t.toggle = function () {
						var e = !0,
							t = !0,
							n = r
								.default(this._element)
								.closest('[data-toggle="buttons"]')[0];
						if (n) {
							var i = this._element.querySelector(
								'input:not([type="hidden"])'
							);
							if (i) {
								if ('radio' === i.type)
									if (
										i.checked &&
										this._element.classList.contains(
											'active'
										)
									)
										e = !1;
									else {
										var o = n.querySelector('.active');
										o && r.default(o).removeClass('active');
									}
								e &&
									(('checkbox' !== i.type &&
										'radio' !== i.type) ||
										(i.checked = !this._element.classList.contains(
											'active'
										)),
									this.shouldAvoidTriggerChange ||
										r.default(i).trigger('change')),
									i.focus(),
									(t = !1);
							}
						}
						this._element.hasAttribute('disabled') ||
							this._element.classList.contains('disabled') ||
							(t &&
								this._element.setAttribute(
									'aria-pressed',
									!this._element.classList.contains('active')
								),
							e &&
								r.default(this._element).toggleClass('active'));
					}),
					(t.dispose = function () {
						r.default.removeData(this._element, 'bs.button'),
							(this._element = null);
					}),
					(e._jQueryInterface = function (t, n) {
						return this.each(function () {
							var i = r.default(this),
								o = i.data('bs.button');
							o || ((o = new e(this)), i.data('bs.button', o)),
								(o.shouldAvoidTriggerChange = n),
								'toggle' === t && o[t]();
						});
					}),
					s(e, null, [
						{
							key: 'VERSION',
							get: function () {
								return '4.5.3';
							},
						},
					]),
					e
				);
			})();
		r
			.default(document)
			.on(
				'click.bs.button.data-api',
				'[data-toggle^="button"]',
				function (e) {
					var t = e.target,
						n = t;
					if (
						(r.default(t).hasClass('btn') ||
							(t = r.default(t).closest('.btn')[0]),
						!t ||
							t.hasAttribute('disabled') ||
							t.classList.contains('disabled'))
					)
						e.preventDefault();
					else {
						var i = t.querySelector('input:not([type="hidden"])');
						if (
							i &&
							(i.hasAttribute('disabled') ||
								i.classList.contains('disabled'))
						)
							return void e.preventDefault();
						('INPUT' !== n.tagName && 'LABEL' === t.tagName) ||
							p._jQueryInterface.call(
								r.default(t),
								'toggle',
								'INPUT' === n.tagName
							);
					}
				}
			)
			.on(
				'focus.bs.button.data-api blur.bs.button.data-api',
				'[data-toggle^="button"]',
				function (e) {
					var t = r.default(e.target).closest('.btn')[0];
					r.default(t).toggleClass(
						'focus',
						/^focus(in)?$/.test(e.type)
					);
				}
			),
			r.default(window).on('load.bs.button.data-api', function () {
				for (
					var e = [].slice.call(
							document.querySelectorAll(
								'[data-toggle="buttons"] .btn'
							)
						),
						t = 0,
						n = e.length;
					t < n;
					t++
				) {
					var i = e[t],
						r = i.querySelector('input:not([type="hidden"])');
					r.checked || r.hasAttribute('checked')
						? i.classList.add('active')
						: i.classList.remove('active');
				}
				for (
					var o = 0,
						a = (e = [].slice.call(
							document.querySelectorAll('[data-toggle="button"]')
						)).length;
					o < a;
					o++
				) {
					var s = e[o];
					'true' === s.getAttribute('aria-pressed')
						? s.classList.add('active')
						: s.classList.remove('active');
				}
			}),
			(r.default.fn.button = p._jQueryInterface),
			(r.default.fn.button.Constructor = p),
			(r.default.fn.button.noConflict = function () {
				return (r.default.fn.button = h), p._jQueryInterface;
			});
		var g = 'carousel',
			m = r.default.fn[g],
			v = {
				interval: 5e3,
				keyboard: !0,
				slide: !1,
				pause: 'hover',
				wrap: !0,
				touch: !0,
			},
			y = {
				interval: '(number|boolean)',
				keyboard: 'boolean',
				slide: '(boolean|string)',
				pause: '(string|boolean)',
				wrap: 'boolean',
				touch: 'boolean',
			},
			b = { TOUCH: 'touch', PEN: 'pen' },
			_ = (function () {
				function e(e, t) {
					(this._items = null),
						(this._interval = null),
						(this._activeElement = null),
						(this._isPaused = !1),
						(this._isSliding = !1),
						(this.touchTimeout = null),
						(this.touchStartX = 0),
						(this.touchDeltaX = 0),
						(this._config = this._getConfig(t)),
						(this._element = e),
						(this._indicatorsElement = this._element.querySelector(
							'.carousel-indicators'
						)),
						(this._touchSupported =
							'ontouchstart' in document.documentElement ||
							navigator.maxTouchPoints > 0),
						(this._pointerEvent = Boolean(
							window.PointerEvent || window.MSPointerEvent
						)),
						this._addEventListeners();
				}
				var t = e.prototype;
				return (
					(t.next = function () {
						this._isSliding || this._slide('next');
					}),
					(t.nextWhenVisible = function () {
						var e = r.default(this._element);
						!document.hidden &&
							e.is(':visible') &&
							'hidden' !== e.css('visibility') &&
							this.next();
					}),
					(t.prev = function () {
						this._isSliding || this._slide('prev');
					}),
					(t.pause = function (e) {
						e || (this._isPaused = !0),
							this._element.querySelector(
								'.carousel-item-next, .carousel-item-prev'
							) &&
								(u.triggerTransitionEnd(this._element),
								this.cycle(!0)),
							clearInterval(this._interval),
							(this._interval = null);
					}),
					(t.cycle = function (e) {
						e || (this._isPaused = !1),
							this._interval &&
								(clearInterval(this._interval),
								(this._interval = null)),
							this._config.interval &&
								!this._isPaused &&
								(this._interval = setInterval(
									(document.visibilityState
										? this.nextWhenVisible
										: this.next
									).bind(this),
									this._config.interval
								));
					}),
					(t.to = function (e) {
						var t = this;
						this._activeElement = this._element.querySelector(
							'.active.carousel-item'
						);
						var n = this._getItemIndex(this._activeElement);
						if (!(e > this._items.length - 1 || e < 0))
							if (this._isSliding)
								r.default(this._element).one(
									'slid.bs.carousel',
									function () {
										return t.to(e);
									}
								);
							else {
								if (n === e)
									return this.pause(), void this.cycle();
								this._slide(
									e > n ? 'next' : 'prev',
									this._items[e]
								);
							}
					}),
					(t.dispose = function () {
						r.default(this._element).off('.bs.carousel'),
							r.default.removeData(this._element, 'bs.carousel'),
							(this._items = null),
							(this._config = null),
							(this._element = null),
							(this._interval = null),
							(this._isPaused = null),
							(this._isSliding = null),
							(this._activeElement = null),
							(this._indicatorsElement = null);
					}),
					(t._getConfig = function (e) {
						return (e = l({}, v, e)), u.typeCheckConfig(g, e, y), e;
					}),
					(t._handleSwipe = function () {
						var e = Math.abs(this.touchDeltaX);
						if (!(e <= 40)) {
							var t = e / this.touchDeltaX;
							(this.touchDeltaX = 0),
								t > 0 && this.prev(),
								t < 0 && this.next();
						}
					}),
					(t._addEventListeners = function () {
						var e = this;
						this._config.keyboard &&
							r
								.default(this._element)
								.on('keydown.bs.carousel', function (t) {
									return e._keydown(t);
								}),
							'hover' === this._config.pause &&
								r
									.default(this._element)
									.on('mouseenter.bs.carousel', function (t) {
										return e.pause(t);
									})
									.on('mouseleave.bs.carousel', function (t) {
										return e.cycle(t);
									}),
							this._config.touch &&
								this._addTouchEventListeners();
					}),
					(t._addTouchEventListeners = function () {
						var e = this;
						if (this._touchSupported) {
							var t = function (t) {
									e._pointerEvent &&
									b[t.originalEvent.pointerType.toUpperCase()]
										? (e.touchStartX =
												t.originalEvent.clientX)
										: e._pointerEvent ||
										  (e.touchStartX =
												t.originalEvent.touches[0].clientX);
								},
								n = function (t) {
									e._pointerEvent &&
										b[
											t.originalEvent.pointerType.toUpperCase()
										] &&
										(e.touchDeltaX =
											t.originalEvent.clientX -
											e.touchStartX),
										e._handleSwipe(),
										'hover' === e._config.pause &&
											(e.pause(),
											e.touchTimeout &&
												clearTimeout(e.touchTimeout),
											(e.touchTimeout = setTimeout(
												function (t) {
													return e.cycle(t);
												},
												500 + e._config.interval
											)));
								};
							r
								.default(
									this._element.querySelectorAll(
										'.carousel-item img'
									)
								)
								.on('dragstart.bs.carousel', function (e) {
									return e.preventDefault();
								}),
								this._pointerEvent
									? (r
											.default(this._element)
											.on(
												'pointerdown.bs.carousel',
												function (e) {
													return t(e);
												}
											),
									  r
											.default(this._element)
											.on(
												'pointerup.bs.carousel',
												function (e) {
													return n(e);
												}
											),
									  this._element.classList.add(
											'pointer-event'
									  ))
									: (r
											.default(this._element)
											.on(
												'touchstart.bs.carousel',
												function (e) {
													return t(e);
												}
											),
									  r
											.default(this._element)
											.on(
												'touchmove.bs.carousel',
												function (t) {
													return (function (t) {
														e.touchDeltaX =
															t.originalEvent
																.touches &&
															t.originalEvent
																.touches
																.length > 1
																? 0
																: t
																		.originalEvent
																		.touches[0]
																		.clientX -
																  e.touchStartX;
													})(t);
												}
											),
									  r
											.default(this._element)
											.on(
												'touchend.bs.carousel',
												function (e) {
													return n(e);
												}
											));
						}
					}),
					(t._keydown = function (e) {
						if (!/input|textarea/i.test(e.target.tagName))
							switch (e.which) {
								case 37:
									e.preventDefault(), this.prev();
									break;
								case 39:
									e.preventDefault(), this.next();
							}
					}),
					(t._getItemIndex = function (e) {
						return (
							(this._items =
								e && e.parentNode
									? [].slice.call(
											e.parentNode.querySelectorAll(
												'.carousel-item'
											)
									  )
									: []),
							this._items.indexOf(e)
						);
					}),
					(t._getItemByDirection = function (e, t) {
						var n = 'next' === e,
							i = 'prev' === e,
							r = this._getItemIndex(t);
						if (
							((i && 0 === r) ||
								(n && r === this._items.length - 1)) &&
							!this._config.wrap
						)
							return t;
						var o =
							(r + ('prev' === e ? -1 : 1)) % this._items.length;
						return -1 === o
							? this._items[this._items.length - 1]
							: this._items[o];
					}),
					(t._triggerSlideEvent = function (e, t) {
						var n = this._getItemIndex(e),
							i = this._getItemIndex(
								this._element.querySelector(
									'.active.carousel-item'
								)
							),
							o = r.default.Event('slide.bs.carousel', {
								relatedTarget: e,
								direction: t,
								from: i,
								to: n,
							});
						return r.default(this._element).trigger(o), o;
					}),
					(t._setActiveIndicatorElement = function (e) {
						if (this._indicatorsElement) {
							var t = [].slice.call(
								this._indicatorsElement.querySelectorAll(
									'.active'
								)
							);
							r.default(t).removeClass('active');
							var n = this._indicatorsElement.children[
								this._getItemIndex(e)
							];
							n && r.default(n).addClass('active');
						}
					}),
					(t._slide = function (e, t) {
						var n,
							i,
							o,
							a = this,
							s = this._element.querySelector(
								'.active.carousel-item'
							),
							l = this._getItemIndex(s),
							c = t || (s && this._getItemByDirection(e, s)),
							f = this._getItemIndex(c),
							d = Boolean(this._interval);
						if (
							('next' === e
								? ((n = 'carousel-item-left'),
								  (i = 'carousel-item-next'),
								  (o = 'left'))
								: ((n = 'carousel-item-right'),
								  (i = 'carousel-item-prev'),
								  (o = 'right')),
							c && r.default(c).hasClass('active'))
						)
							this._isSliding = !1;
						else if (
							!this._triggerSlideEvent(
								c,
								o
							).isDefaultPrevented() &&
							s &&
							c
						) {
							(this._isSliding = !0),
								d && this.pause(),
								this._setActiveIndicatorElement(c);
							var h = r.default.Event('slid.bs.carousel', {
								relatedTarget: c,
								direction: o,
								from: l,
								to: f,
							});
							if (r.default(this._element).hasClass('slide')) {
								r.default(c).addClass(i),
									u.reflow(c),
									r.default(s).addClass(n),
									r.default(c).addClass(n);
								var p = parseInt(
									c.getAttribute('data-interval'),
									10
								);
								p
									? ((this._config.defaultInterval =
											this._config.defaultInterval ||
											this._config.interval),
									  (this._config.interval = p))
									: (this._config.interval =
											this._config.defaultInterval ||
											this._config.interval);
								var g = u.getTransitionDurationFromElement(s);
								r.default(s)
									.one(u.TRANSITION_END, function () {
										r
											.default(c)
											.removeClass(n + ' ' + i)
											.addClass('active'),
											r
												.default(s)
												.removeClass(
													'active ' + i + ' ' + n
												),
											(a._isSliding = !1),
											setTimeout(function () {
												return r
													.default(a._element)
													.trigger(h);
											}, 0);
									})
									.emulateTransitionEnd(g);
							} else
								r.default(s).removeClass('active'),
									r.default(c).addClass('active'),
									(this._isSliding = !1),
									r.default(this._element).trigger(h);
							d && this.cycle();
						}
					}),
					(e._jQueryInterface = function (t) {
						return this.each(function () {
							var n = r.default(this).data('bs.carousel'),
								i = l({}, v, r.default(this).data());
							'object' == typeof t && (i = l({}, i, t));
							var o = 'string' == typeof t ? t : i.slide;
							if (
								(n ||
									((n = new e(this, i)),
									r.default(this).data('bs.carousel', n)),
								'number' == typeof t)
							)
								n.to(t);
							else if ('string' == typeof o) {
								if (void 0 === n[o])
									throw new TypeError(
										'No method named "' + o + '"'
									);
								n[o]();
							} else
								i.interval && i.ride && (n.pause(), n.cycle());
						});
					}),
					(e._dataApiClickHandler = function (t) {
						var n = u.getSelectorFromElement(this);
						if (n) {
							var i = r.default(n)[0];
							if (i && r.default(i).hasClass('carousel')) {
								var o = l(
										{},
										r.default(i).data(),
										r.default(this).data()
									),
									a = this.getAttribute('data-slide-to');
								a && (o.interval = !1),
									e._jQueryInterface.call(r.default(i), o),
									a && r.default(i).data('bs.carousel').to(a),
									t.preventDefault();
							}
						}
					}),
					s(e, null, [
						{
							key: 'VERSION',
							get: function () {
								return '4.5.3';
							},
						},
						{
							key: 'Default',
							get: function () {
								return v;
							},
						},
					]),
					e
				);
			})();
		r
			.default(document)
			.on(
				'click.bs.carousel.data-api',
				'[data-slide], [data-slide-to]',
				_._dataApiClickHandler
			),
			r.default(window).on('load.bs.carousel.data-api', function () {
				for (
					var e = [].slice.call(
							document.querySelectorAll('[data-ride="carousel"]')
						),
						t = 0,
						n = e.length;
					t < n;
					t++
				) {
					var i = r.default(e[t]);
					_._jQueryInterface.call(i, i.data());
				}
			}),
			(r.default.fn[g] = _._jQueryInterface),
			(r.default.fn[g].Constructor = _),
			(r.default.fn[g].noConflict = function () {
				return (r.default.fn[g] = m), _._jQueryInterface;
			});
		var w = 'collapse',
			T = r.default.fn[w],
			E = { toggle: !0, parent: '' },
			x = { toggle: 'boolean', parent: '(string|element)' },
			C = (function () {
				function e(e, t) {
					(this._isTransitioning = !1),
						(this._element = e),
						(this._config = this._getConfig(t)),
						(this._triggerArray = [].slice.call(
							document.querySelectorAll(
								'[data-toggle="collapse"][href="#' +
									e.id +
									'"],[data-toggle="collapse"][data-target="#' +
									e.id +
									'"]'
							)
						));
					for (
						var n = [].slice.call(
								document.querySelectorAll(
									'[data-toggle="collapse"]'
								)
							),
							i = 0,
							r = n.length;
						i < r;
						i++
					) {
						var o = n[i],
							a = u.getSelectorFromElement(o),
							s = [].slice
								.call(document.querySelectorAll(a))
								.filter(function (t) {
									return t === e;
								});
						null !== a &&
							s.length > 0 &&
							((this._selector = a), this._triggerArray.push(o));
					}
					(this._parent = this._config.parent
						? this._getParent()
						: null),
						this._config.parent ||
							this._addAriaAndCollapsedClass(
								this._element,
								this._triggerArray
							),
						this._config.toggle && this.toggle();
				}
				var t = e.prototype;
				return (
					(t.toggle = function () {
						r.default(this._element).hasClass('show')
							? this.hide()
							: this.show();
					}),
					(t.show = function () {
						var t,
							n,
							i = this;
						if (
							!(
								this._isTransitioning ||
								r.default(this._element).hasClass('show') ||
								(this._parent &&
									0 ===
										(t = [].slice
											.call(
												this._parent.querySelectorAll(
													'.show, .collapsing'
												)
											)
											.filter(function (e) {
												return 'string' ==
													typeof i._config.parent
													? e.getAttribute(
															'data-parent'
													  ) === i._config.parent
													: e.classList.contains(
															'collapse'
													  );
											})).length &&
									(t = null),
								t &&
									(n = r
										.default(t)
										.not(this._selector)
										.data('bs.collapse')) &&
									n._isTransitioning)
							)
						) {
							var o = r.default.Event('show.bs.collapse');
							if (
								(r.default(this._element).trigger(o),
								!o.isDefaultPrevented())
							) {
								t &&
									(e._jQueryInterface.call(
										r.default(t).not(this._selector),
										'hide'
									),
									n ||
										r.default(t).data('bs.collapse', null));
								var a = this._getDimension();
								r
									.default(this._element)
									.removeClass('collapse')
									.addClass('collapsing'),
									(this._element.style[a] = 0),
									this._triggerArray.length &&
										r
											.default(this._triggerArray)
											.removeClass('collapsed')
											.attr('aria-expanded', !0),
									this.setTransitioning(!0);
								var s =
										'scroll' +
										(a[0].toUpperCase() + a.slice(1)),
									l = u.getTransitionDurationFromElement(
										this._element
									);
								r
									.default(this._element)
									.one(u.TRANSITION_END, function () {
										r
											.default(i._element)
											.removeClass('collapsing')
											.addClass('collapse show'),
											(i._element.style[a] = ''),
											i.setTransitioning(!1),
											r
												.default(i._element)
												.trigger('shown.bs.collapse');
									})
									.emulateTransitionEnd(l),
									(this._element.style[a] =
										this._element[s] + 'px');
							}
						}
					}),
					(t.hide = function () {
						var e = this;
						if (
							!this._isTransitioning &&
							r.default(this._element).hasClass('show')
						) {
							var t = r.default.Event('hide.bs.collapse');
							if (
								(r.default(this._element).trigger(t),
								!t.isDefaultPrevented())
							) {
								var n = this._getDimension();
								(this._element.style[n] =
									this._element.getBoundingClientRect()[n] +
									'px'),
									u.reflow(this._element),
									r
										.default(this._element)
										.addClass('collapsing')
										.removeClass('collapse show');
								var i = this._triggerArray.length;
								if (i > 0)
									for (var o = 0; o < i; o++) {
										var a = this._triggerArray[o],
											s = u.getSelectorFromElement(a);
										null !== s &&
											(r
												.default(
													[].slice.call(
														document.querySelectorAll(
															s
														)
													)
												)
												.hasClass('show') ||
												r
													.default(a)
													.addClass('collapsed')
													.attr('aria-expanded', !1));
									}
								this.setTransitioning(!0),
									(this._element.style[n] = '');
								var l = u.getTransitionDurationFromElement(
									this._element
								);
								r.default(this._element)
									.one(u.TRANSITION_END, function () {
										e.setTransitioning(!1),
											r
												.default(e._element)
												.removeClass('collapsing')
												.addClass('collapse')
												.trigger('hidden.bs.collapse');
									})
									.emulateTransitionEnd(l);
							}
						}
					}),
					(t.setTransitioning = function (e) {
						this._isTransitioning = e;
					}),
					(t.dispose = function () {
						r.default.removeData(this._element, 'bs.collapse'),
							(this._config = null),
							(this._parent = null),
							(this._element = null),
							(this._triggerArray = null),
							(this._isTransitioning = null);
					}),
					(t._getConfig = function (e) {
						return (
							((e = l({}, E, e)).toggle = Boolean(e.toggle)),
							u.typeCheckConfig(w, e, x),
							e
						);
					}),
					(t._getDimension = function () {
						return r.default(this._element).hasClass('width')
							? 'width'
							: 'height';
					}),
					(t._getParent = function () {
						var t,
							n = this;
						u.isElement(this._config.parent)
							? ((t = this._config.parent),
							  void 0 !== this._config.parent.jquery &&
									(t = this._config.parent[0]))
							: (t = document.querySelector(this._config.parent));
						var i = [].slice.call(
							t.querySelectorAll(
								'[data-toggle="collapse"][data-parent="' +
									this._config.parent +
									'"]'
							)
						);
						return (
							r.default(i).each(function (t, i) {
								n._addAriaAndCollapsedClass(
									e._getTargetFromElement(i),
									[i]
								);
							}),
							t
						);
					}),
					(t._addAriaAndCollapsedClass = function (e, t) {
						var n = r.default(e).hasClass('show');
						t.length &&
							r
								.default(t)
								.toggleClass('collapsed', !n)
								.attr('aria-expanded', n);
					}),
					(e._getTargetFromElement = function (e) {
						var t = u.getSelectorFromElement(e);
						return t ? document.querySelector(t) : null;
					}),
					(e._jQueryInterface = function (t) {
						return this.each(function () {
							var n = r.default(this),
								i = n.data('bs.collapse'),
								o = l(
									{},
									E,
									n.data(),
									'object' == typeof t && t ? t : {}
								);
							if (
								(!i &&
									o.toggle &&
									'string' == typeof t &&
									/show|hide/.test(t) &&
									(o.toggle = !1),
								i ||
									((i = new e(this, o)),
									n.data('bs.collapse', i)),
								'string' == typeof t)
							) {
								if (void 0 === i[t])
									throw new TypeError(
										'No method named "' + t + '"'
									);
								i[t]();
							}
						});
					}),
					s(e, null, [
						{
							key: 'VERSION',
							get: function () {
								return '4.5.3';
							},
						},
						{
							key: 'Default',
							get: function () {
								return E;
							},
						},
					]),
					e
				);
			})();
		r
			.default(document)
			.on(
				'click.bs.collapse.data-api',
				'[data-toggle="collapse"]',
				function (e) {
					'A' === e.currentTarget.tagName && e.preventDefault();
					var t = r.default(this),
						n = u.getSelectorFromElement(this),
						i = [].slice.call(document.querySelectorAll(n));
					r.default(i).each(function () {
						var e = r.default(this),
							n = e.data('bs.collapse') ? 'toggle' : t.data();
						C._jQueryInterface.call(e, n);
					});
				}
			),
			(r.default.fn[w] = C._jQueryInterface),
			(r.default.fn[w].Constructor = C),
			(r.default.fn[w].noConflict = function () {
				return (r.default.fn[w] = T), C._jQueryInterface;
			});
		var S = 'dropdown',
			k = r.default.fn[S],
			A = new RegExp('38|40|27'),
			D = {
				offset: 0,
				flip: !0,
				boundary: 'scrollParent',
				reference: 'toggle',
				display: 'dynamic',
				popperConfig: null,
			},
			N = {
				offset: '(number|string|function)',
				flip: 'boolean',
				boundary: '(string|element)',
				reference: '(string|element)',
				display: 'string',
				popperConfig: '(null|object)',
			},
			j = (function () {
				function e(e, t) {
					(this._element = e),
						(this._popper = null),
						(this._config = this._getConfig(t)),
						(this._menu = this._getMenuElement()),
						(this._inNavbar = this._detectNavbar()),
						this._addEventListeners();
				}
				var t = e.prototype;
				return (
					(t.toggle = function () {
						if (
							!this._element.disabled &&
							!r.default(this._element).hasClass('disabled')
						) {
							var t = r.default(this._menu).hasClass('show');
							e._clearMenus(), t || this.show(!0);
						}
					}),
					(t.show = function (t) {
						if (
							(void 0 === t && (t = !1),
							!(
								this._element.disabled ||
								r.default(this._element).hasClass('disabled') ||
								r.default(this._menu).hasClass('show')
							))
						) {
							var n = { relatedTarget: this._element },
								i = r.default.Event('show.bs.dropdown', n),
								a = e._getParentFromElement(this._element);
							if (
								(r.default(a).trigger(i),
								!i.isDefaultPrevented())
							) {
								if (!this._inNavbar && t) {
									if (void 0 === o.default)
										throw new TypeError(
											"Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
										);
									var s = this._element;
									'parent' === this._config.reference
										? (s = a)
										: u.isElement(this._config.reference) &&
										  ((s = this._config.reference),
										  void 0 !==
												this._config.reference.jquery &&
												(s = this._config
													.reference[0])),
										'scrollParent' !==
											this._config.boundary &&
											r
												.default(a)
												.addClass('position-static'),
										(this._popper = new o.default(
											s,
											this._menu,
											this._getPopperConfig()
										));
								}
								'ontouchstart' in document.documentElement &&
									0 ===
										r.default(a).closest('.navbar-nav')
											.length &&
									r
										.default(document.body)
										.children()
										.on('mouseover', null, r.default.noop),
									this._element.focus(),
									this._element.setAttribute(
										'aria-expanded',
										!0
									),
									r.default(this._menu).toggleClass('show'),
									r
										.default(a)
										.toggleClass('show')
										.trigger(
											r.default.Event(
												'shown.bs.dropdown',
												n
											)
										);
							}
						}
					}),
					(t.hide = function () {
						if (
							!this._element.disabled &&
							!r.default(this._element).hasClass('disabled') &&
							r.default(this._menu).hasClass('show')
						) {
							var t = { relatedTarget: this._element },
								n = r.default.Event('hide.bs.dropdown', t),
								i = e._getParentFromElement(this._element);
							r.default(i).trigger(n),
								n.isDefaultPrevented() ||
									(this._popper && this._popper.destroy(),
									r.default(this._menu).toggleClass('show'),
									r
										.default(i)
										.toggleClass('show')
										.trigger(
											r.default.Event(
												'hidden.bs.dropdown',
												t
											)
										));
						}
					}),
					(t.dispose = function () {
						r.default.removeData(this._element, 'bs.dropdown'),
							r.default(this._element).off('.bs.dropdown'),
							(this._element = null),
							(this._menu = null),
							null !== this._popper &&
								(this._popper.destroy(), (this._popper = null));
					}),
					(t.update = function () {
						(this._inNavbar = this._detectNavbar()),
							null !== this._popper &&
								this._popper.scheduleUpdate();
					}),
					(t._addEventListeners = function () {
						var e = this;
						r.default(this._element).on(
							'click.bs.dropdown',
							function (t) {
								t.preventDefault(),
									t.stopPropagation(),
									e.toggle();
							}
						);
					}),
					(t._getConfig = function (e) {
						return (
							(e = l(
								{},
								this.constructor.Default,
								r.default(this._element).data(),
								e
							)),
							u.typeCheckConfig(
								S,
								e,
								this.constructor.DefaultType
							),
							e
						);
					}),
					(t._getMenuElement = function () {
						if (!this._menu) {
							var t = e._getParentFromElement(this._element);
							t &&
								(this._menu = t.querySelector(
									'.dropdown-menu'
								));
						}
						return this._menu;
					}),
					(t._getPlacement = function () {
						var e = r.default(this._element.parentNode),
							t = 'bottom-start';
						return (
							e.hasClass('dropup')
								? (t = r
										.default(this._menu)
										.hasClass('dropdown-menu-right')
										? 'top-end'
										: 'top-start')
								: e.hasClass('dropright')
								? (t = 'right-start')
								: e.hasClass('dropleft')
								? (t = 'left-start')
								: r
										.default(this._menu)
										.hasClass('dropdown-menu-right') &&
								  (t = 'bottom-end'),
							t
						);
					}),
					(t._detectNavbar = function () {
						return (
							r.default(this._element).closest('.navbar').length >
							0
						);
					}),
					(t._getOffset = function () {
						var e = this,
							t = {};
						return (
							'function' == typeof this._config.offset
								? (t.fn = function (t) {
										return (
											(t.offsets = l(
												{},
												t.offsets,
												e._config.offset(
													t.offsets,
													e._element
												) || {}
											)),
											t
										);
								  })
								: (t.offset = this._config.offset),
							t
						);
					}),
					(t._getPopperConfig = function () {
						var e = {
							placement: this._getPlacement(),
							modifiers: {
								offset: this._getOffset(),
								flip: { enabled: this._config.flip },
								preventOverflow: {
									boundariesElement: this._config.boundary,
								},
							},
						};
						return (
							'static' === this._config.display &&
								(e.modifiers.applyStyle = { enabled: !1 }),
							l({}, e, this._config.popperConfig)
						);
					}),
					(e._jQueryInterface = function (t) {
						return this.each(function () {
							var n = r.default(this).data('bs.dropdown');
							if (
								(n ||
									((n = new e(
										this,
										'object' == typeof t ? t : null
									)),
									r.default(this).data('bs.dropdown', n)),
								'string' == typeof t)
							) {
								if (void 0 === n[t])
									throw new TypeError(
										'No method named "' + t + '"'
									);
								n[t]();
							}
						});
					}),
					(e._clearMenus = function (t) {
						if (
							!t ||
							(3 !== t.which &&
								('keyup' !== t.type || 9 === t.which))
						)
							for (
								var n = [].slice.call(
										document.querySelectorAll(
											'[data-toggle="dropdown"]'
										)
									),
									i = 0,
									o = n.length;
								i < o;
								i++
							) {
								var a = e._getParentFromElement(n[i]),
									s = r.default(n[i]).data('bs.dropdown'),
									l = { relatedTarget: n[i] };
								if (
									(t &&
										'click' === t.type &&
										(l.clickEvent = t),
									s)
								) {
									var u = s._menu;
									if (
										r.default(a).hasClass('show') &&
										!(
											t &&
											(('click' === t.type &&
												/input|textarea/i.test(
													t.target.tagName
												)) ||
												('keyup' === t.type &&
													9 === t.which)) &&
											r.default.contains(a, t.target)
										)
									) {
										var c = r.default.Event(
											'hide.bs.dropdown',
											l
										);
										r.default(a).trigger(c),
											c.isDefaultPrevented() ||
												('ontouchstart' in
													document.documentElement &&
													r
														.default(document.body)
														.children()
														.off(
															'mouseover',
															null,
															r.default.noop
														),
												n[i].setAttribute(
													'aria-expanded',
													'false'
												),
												s._popper &&
													s._popper.destroy(),
												r
													.default(u)
													.removeClass('show'),
												r
													.default(a)
													.removeClass('show')
													.trigger(
														r.default.Event(
															'hidden.bs.dropdown',
															l
														)
													));
									}
								}
							}
					}),
					(e._getParentFromElement = function (e) {
						var t,
							n = u.getSelectorFromElement(e);
						return (
							n && (t = document.querySelector(n)),
							t || e.parentNode
						);
					}),
					(e._dataApiKeydownHandler = function (t) {
						if (
							!(/input|textarea/i.test(t.target.tagName)
								? 32 === t.which ||
								  (27 !== t.which &&
										((40 !== t.which && 38 !== t.which) ||
											r
												.default(t.target)
												.closest('.dropdown-menu')
												.length))
								: !A.test(t.which)) &&
							!this.disabled &&
							!r.default(this).hasClass('disabled')
						) {
							var n = e._getParentFromElement(this),
								i = r.default(n).hasClass('show');
							if (i || 27 !== t.which) {
								if (
									(t.preventDefault(),
									t.stopPropagation(),
									!i || 27 === t.which || 32 === t.which)
								)
									return (
										27 === t.which &&
											r
												.default(
													n.querySelector(
														'[data-toggle="dropdown"]'
													)
												)
												.trigger('focus'),
										void r.default(this).trigger('click')
									);
								var o = [].slice
									.call(
										n.querySelectorAll(
											'.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
										)
									)
									.filter(function (e) {
										return r.default(e).is(':visible');
									});
								if (0 !== o.length) {
									var a = o.indexOf(t.target);
									38 === t.which && a > 0 && a--,
										40 === t.which &&
											a < o.length - 1 &&
											a++,
										a < 0 && (a = 0),
										o[a].focus();
								}
							}
						}
					}),
					s(e, null, [
						{
							key: 'VERSION',
							get: function () {
								return '4.5.3';
							},
						},
						{
							key: 'Default',
							get: function () {
								return D;
							},
						},
						{
							key: 'DefaultType',
							get: function () {
								return N;
							},
						},
					]),
					e
				);
			})();
		r
			.default(document)
			.on(
				'keydown.bs.dropdown.data-api',
				'[data-toggle="dropdown"]',
				j._dataApiKeydownHandler
			)
			.on(
				'keydown.bs.dropdown.data-api',
				'.dropdown-menu',
				j._dataApiKeydownHandler
			)
			.on(
				'click.bs.dropdown.data-api keyup.bs.dropdown.data-api',
				j._clearMenus
			)
			.on(
				'click.bs.dropdown.data-api',
				'[data-toggle="dropdown"]',
				function (e) {
					e.preventDefault(),
						e.stopPropagation(),
						j._jQueryInterface.call(r.default(this), 'toggle');
				}
			)
			.on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
				e.stopPropagation();
			}),
			(r.default.fn[S] = j._jQueryInterface),
			(r.default.fn[S].Constructor = j),
			(r.default.fn[S].noConflict = function () {
				return (r.default.fn[S] = k), j._jQueryInterface;
			});
		var I = r.default.fn.modal,
			O = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
			q = {
				backdrop: '(boolean|string)',
				keyboard: 'boolean',
				focus: 'boolean',
				show: 'boolean',
			},
			L = (function () {
				function e(e, t) {
					(this._config = this._getConfig(t)),
						(this._element = e),
						(this._dialog = e.querySelector('.modal-dialog')),
						(this._backdrop = null),
						(this._isShown = !1),
						(this._isBodyOverflowing = !1),
						(this._ignoreBackdropClick = !1),
						(this._isTransitioning = !1),
						(this._scrollbarWidth = 0);
				}
				var t = e.prototype;
				return (
					(t.toggle = function (e) {
						return this._isShown ? this.hide() : this.show(e);
					}),
					(t.show = function (e) {
						var t = this;
						if (!this._isShown && !this._isTransitioning) {
							r.default(this._element).hasClass('fade') &&
								(this._isTransitioning = !0);
							var n = r.default.Event('show.bs.modal', {
								relatedTarget: e,
							});
							r.default(this._element).trigger(n),
								this._isShown ||
									n.isDefaultPrevented() ||
									((this._isShown = !0),
									this._checkScrollbar(),
									this._setScrollbar(),
									this._adjustDialog(),
									this._setEscapeEvent(),
									this._setResizeEvent(),
									r
										.default(this._element)
										.on(
											'click.dismiss.bs.modal',
											'[data-dismiss="modal"]',
											function (e) {
												return t.hide(e);
											}
										),
									r
										.default(this._dialog)
										.on(
											'mousedown.dismiss.bs.modal',
											function () {
												r.default(t._element).one(
													'mouseup.dismiss.bs.modal',
													function (e) {
														r
															.default(e.target)
															.is(t._element) &&
															(t._ignoreBackdropClick = !0);
													}
												);
											}
										),
									this._showBackdrop(function () {
										return t._showElement(e);
									}));
						}
					}),
					(t.hide = function (e) {
						var t = this;
						if (
							(e && e.preventDefault(),
							this._isShown && !this._isTransitioning)
						) {
							var n = r.default.Event('hide.bs.modal');
							if (
								(r.default(this._element).trigger(n),
								this._isShown && !n.isDefaultPrevented())
							) {
								this._isShown = !1;
								var i = r
									.default(this._element)
									.hasClass('fade');
								if (
									(i && (this._isTransitioning = !0),
									this._setEscapeEvent(),
									this._setResizeEvent(),
									r.default(document).off('focusin.bs.modal'),
									r
										.default(this._element)
										.removeClass('show'),
									r
										.default(this._element)
										.off('click.dismiss.bs.modal'),
									r
										.default(this._dialog)
										.off('mousedown.dismiss.bs.modal'),
									i)
								) {
									var o = u.getTransitionDurationFromElement(
										this._element
									);
									r.default(this._element)
										.one(u.TRANSITION_END, function (e) {
											return t._hideModal(e);
										})
										.emulateTransitionEnd(o);
								} else this._hideModal();
							}
						}
					}),
					(t.dispose = function () {
						[window, this._element, this._dialog].forEach(function (
							e
						) {
							return r.default(e).off('.bs.modal');
						}),
							r.default(document).off('focusin.bs.modal'),
							r.default.removeData(this._element, 'bs.modal'),
							(this._config = null),
							(this._element = null),
							(this._dialog = null),
							(this._backdrop = null),
							(this._isShown = null),
							(this._isBodyOverflowing = null),
							(this._ignoreBackdropClick = null),
							(this._isTransitioning = null),
							(this._scrollbarWidth = null);
					}),
					(t.handleUpdate = function () {
						this._adjustDialog();
					}),
					(t._getConfig = function (e) {
						return (
							(e = l({}, O, e)),
							u.typeCheckConfig('modal', e, q),
							e
						);
					}),
					(t._triggerBackdropTransition = function () {
						var e = this;
						if ('static' === this._config.backdrop) {
							var t = r.default.Event('hidePrevented.bs.modal');
							if (
								(r.default(this._element).trigger(t),
								t.isDefaultPrevented())
							)
								return;
							var n =
								this._element.scrollHeight >
								document.documentElement.clientHeight;
							n || (this._element.style.overflowY = 'hidden'),
								this._element.classList.add('modal-static');
							var i = u.getTransitionDurationFromElement(
								this._dialog
							);
							r.default(this._element).off(u.TRANSITION_END),
								r
									.default(this._element)
									.one(u.TRANSITION_END, function () {
										e._element.classList.remove(
											'modal-static'
										),
											n ||
												r
													.default(e._element)
													.one(
														u.TRANSITION_END,
														function () {
															e._element.style.overflowY =
																'';
														}
													)
													.emulateTransitionEnd(
														e._element,
														i
													);
									})
									.emulateTransitionEnd(i),
								this._element.focus();
						} else this.hide();
					}),
					(t._showElement = function (e) {
						var t = this,
							n = r.default(this._element).hasClass('fade'),
							i = this._dialog
								? this._dialog.querySelector('.modal-body')
								: null;
						(this._element.parentNode &&
							this._element.parentNode.nodeType ===
								Node.ELEMENT_NODE) ||
							document.body.appendChild(this._element),
							(this._element.style.display = 'block'),
							this._element.removeAttribute('aria-hidden'),
							this._element.setAttribute('aria-modal', !0),
							this._element.setAttribute('role', 'dialog'),
							r
								.default(this._dialog)
								.hasClass('modal-dialog-scrollable') && i
								? (i.scrollTop = 0)
								: (this._element.scrollTop = 0),
							n && u.reflow(this._element),
							r.default(this._element).addClass('show'),
							this._config.focus && this._enforceFocus();
						var o = r.default.Event('shown.bs.modal', {
								relatedTarget: e,
							}),
							a = function () {
								t._config.focus && t._element.focus(),
									(t._isTransitioning = !1),
									r.default(t._element).trigger(o);
							};
						if (n) {
							var s = u.getTransitionDurationFromElement(
								this._dialog
							);
							r.default(this._dialog)
								.one(u.TRANSITION_END, a)
								.emulateTransitionEnd(s);
						} else a();
					}),
					(t._enforceFocus = function () {
						var e = this;
						r.default(document)
							.off('focusin.bs.modal')
							.on('focusin.bs.modal', function (t) {
								document !== t.target &&
									e._element !== t.target &&
									0 ===
										r.default(e._element).has(t.target)
											.length &&
									e._element.focus();
							});
					}),
					(t._setEscapeEvent = function () {
						var e = this;
						this._isShown
							? r
									.default(this._element)
									.on('keydown.dismiss.bs.modal', function (
										t
									) {
										e._config.keyboard && 27 === t.which
											? (t.preventDefault(), e.hide())
											: e._config.keyboard ||
											  27 !== t.which ||
											  e._triggerBackdropTransition();
									})
							: this._isShown ||
							  r
									.default(this._element)
									.off('keydown.dismiss.bs.modal');
					}),
					(t._setResizeEvent = function () {
						var e = this;
						this._isShown
							? r
									.default(window)
									.on('resize.bs.modal', function (t) {
										return e.handleUpdate(t);
									})
							: r.default(window).off('resize.bs.modal');
					}),
					(t._hideModal = function () {
						var e = this;
						(this._element.style.display = 'none'),
							this._element.setAttribute('aria-hidden', !0),
							this._element.removeAttribute('aria-modal'),
							this._element.removeAttribute('role'),
							(this._isTransitioning = !1),
							this._showBackdrop(function () {
								r
									.default(document.body)
									.removeClass('modal-open'),
									e._resetAdjustments(),
									e._resetScrollbar(),
									r
										.default(e._element)
										.trigger('hidden.bs.modal');
							});
					}),
					(t._removeBackdrop = function () {
						this._backdrop &&
							(r.default(this._backdrop).remove(),
							(this._backdrop = null));
					}),
					(t._showBackdrop = function (e) {
						var t = this,
							n = r.default(this._element).hasClass('fade')
								? 'fade'
								: '';
						if (this._isShown && this._config.backdrop) {
							if (
								((this._backdrop = document.createElement(
									'div'
								)),
								(this._backdrop.className = 'modal-backdrop'),
								n && this._backdrop.classList.add(n),
								r
									.default(this._backdrop)
									.appendTo(document.body),
								r
									.default(this._element)
									.on('click.dismiss.bs.modal', function (e) {
										t._ignoreBackdropClick
											? (t._ignoreBackdropClick = !1)
											: e.target === e.currentTarget &&
											  t._triggerBackdropTransition();
									}),
								n && u.reflow(this._backdrop),
								r.default(this._backdrop).addClass('show'),
								!e)
							)
								return;
							if (!n) return void e();
							var i = u.getTransitionDurationFromElement(
								this._backdrop
							);
							r.default(this._backdrop)
								.one(u.TRANSITION_END, e)
								.emulateTransitionEnd(i);
						} else if (!this._isShown && this._backdrop) {
							r.default(this._backdrop).removeClass('show');
							var o = function () {
								t._removeBackdrop(), e && e();
							};
							if (r.default(this._element).hasClass('fade')) {
								var a = u.getTransitionDurationFromElement(
									this._backdrop
								);
								r.default(this._backdrop)
									.one(u.TRANSITION_END, o)
									.emulateTransitionEnd(a);
							} else o();
						} else e && e();
					}),
					(t._adjustDialog = function () {
						var e =
							this._element.scrollHeight >
							document.documentElement.clientHeight;
						!this._isBodyOverflowing &&
							e &&
							(this._element.style.paddingLeft =
								this._scrollbarWidth + 'px'),
							this._isBodyOverflowing &&
								!e &&
								(this._element.style.paddingRight =
									this._scrollbarWidth + 'px');
					}),
					(t._resetAdjustments = function () {
						(this._element.style.paddingLeft = ''),
							(this._element.style.paddingRight = '');
					}),
					(t._checkScrollbar = function () {
						var e = document.body.getBoundingClientRect();
						(this._isBodyOverflowing =
							Math.round(e.left + e.right) < window.innerWidth),
							(this._scrollbarWidth = this._getScrollbarWidth());
					}),
					(t._setScrollbar = function () {
						var e = this;
						if (this._isBodyOverflowing) {
							var t = [].slice.call(
									document.querySelectorAll(
										'.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
									)
								),
								n = [].slice.call(
									document.querySelectorAll('.sticky-top')
								);
							r.default(t).each(function (t, n) {
								var i = n.style.paddingRight,
									o = r.default(n).css('padding-right');
								r.default(n)
									.data('padding-right', i)
									.css(
										'padding-right',
										parseFloat(o) + e._scrollbarWidth + 'px'
									);
							}),
								r.default(n).each(function (t, n) {
									var i = n.style.marginRight,
										o = r.default(n).css('margin-right');
									r.default(n)
										.data('margin-right', i)
										.css(
											'margin-right',
											parseFloat(o) -
												e._scrollbarWidth +
												'px'
										);
								});
							var i = document.body.style.paddingRight,
								o = r
									.default(document.body)
									.css('padding-right');
							r.default(document.body)
								.data('padding-right', i)
								.css(
									'padding-right',
									parseFloat(o) + this._scrollbarWidth + 'px'
								);
						}
						r.default(document.body).addClass('modal-open');
					}),
					(t._resetScrollbar = function () {
						var e = [].slice.call(
							document.querySelectorAll(
								'.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
							)
						);
						r.default(e).each(function (e, t) {
							var n = r.default(t).data('padding-right');
							r.default(t).removeData('padding-right'),
								(t.style.paddingRight = n || '');
						});
						var t = [].slice.call(
							document.querySelectorAll('.sticky-top')
						);
						r.default(t).each(function (e, t) {
							var n = r.default(t).data('margin-right');
							void 0 !== n &&
								r
									.default(t)
									.css('margin-right', n)
									.removeData('margin-right');
						});
						var n = r.default(document.body).data('padding-right');
						r.default(document.body).removeData('padding-right'),
							(document.body.style.paddingRight = n || '');
					}),
					(t._getScrollbarWidth = function () {
						var e = document.createElement('div');
						(e.className = 'modal-scrollbar-measure'),
							document.body.appendChild(e);
						var t = e.getBoundingClientRect().width - e.clientWidth;
						return document.body.removeChild(e), t;
					}),
					(e._jQueryInterface = function (t, n) {
						return this.each(function () {
							var i = r.default(this).data('bs.modal'),
								o = l(
									{},
									O,
									r.default(this).data(),
									'object' == typeof t && t ? t : {}
								);
							if (
								(i ||
									((i = new e(this, o)),
									r.default(this).data('bs.modal', i)),
								'string' == typeof t)
							) {
								if (void 0 === i[t])
									throw new TypeError(
										'No method named "' + t + '"'
									);
								i[t](n);
							} else o.show && i.show(n);
						});
					}),
					s(e, null, [
						{
							key: 'VERSION',
							get: function () {
								return '4.5.3';
							},
						},
						{
							key: 'Default',
							get: function () {
								return O;
							},
						},
					]),
					e
				);
			})();
		r
			.default(document)
			.on('click.bs.modal.data-api', '[data-toggle="modal"]', function (
				e
			) {
				var t,
					n = this,
					i = u.getSelectorFromElement(this);
				i && (t = document.querySelector(i));
				var o = r.default(t).data('bs.modal')
					? 'toggle'
					: l({}, r.default(t).data(), r.default(this).data());
				('A' !== this.tagName && 'AREA' !== this.tagName) ||
					e.preventDefault();
				var a = r.default(t).one('show.bs.modal', function (e) {
					e.isDefaultPrevented() ||
						a.one('hidden.bs.modal', function () {
							r.default(n).is(':visible') && n.focus();
						});
				});
				L._jQueryInterface.call(r.default(t), o, this);
			}),
			(r.default.fn.modal = L._jQueryInterface),
			(r.default.fn.modal.Constructor = L),
			(r.default.fn.modal.noConflict = function () {
				return (r.default.fn.modal = I), L._jQueryInterface;
			});
		var P = [
				'background',
				'cite',
				'href',
				'itemtype',
				'longdesc',
				'poster',
				'src',
				'xlink:href',
			],
			R = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
			H = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
		function F(e, t, n) {
			if (0 === e.length) return e;
			if (n && 'function' == typeof n) return n(e);
			for (
				var i = new window.DOMParser().parseFromString(e, 'text/html'),
					r = Object.keys(t),
					o = [].slice.call(i.body.querySelectorAll('*')),
					a = function (e, n) {
						var i = o[e],
							a = i.nodeName.toLowerCase();
						if (-1 === r.indexOf(i.nodeName.toLowerCase()))
							return i.parentNode.removeChild(i), 'continue';
						var s = [].slice.call(i.attributes),
							l = [].concat(t['*'] || [], t[a] || []);
						s.forEach(function (e) {
							(function (e, t) {
								var n = e.nodeName.toLowerCase();
								if (-1 !== t.indexOf(n))
									return (
										-1 === P.indexOf(n) ||
										Boolean(
											e.nodeValue.match(R) ||
												e.nodeValue.match(H)
										)
									);
								for (
									var i = t.filter(function (e) {
											return e instanceof RegExp;
										}),
										r = 0,
										o = i.length;
									r < o;
									r++
								)
									if (n.match(i[r])) return !0;
								return !1;
							})(e, l) || i.removeAttribute(e.nodeName);
						});
					},
					s = 0,
					l = o.length;
				s < l;
				s++
			)
				a(s);
			return i.body.innerHTML;
		}
		var M = 'tooltip',
			$ = r.default.fn[M],
			B = new RegExp('(^|\\s)bs-tooltip\\S+', 'g'),
			W = ['sanitize', 'whiteList', 'sanitizeFn'],
			U = {
				animation: 'boolean',
				template: 'string',
				title: '(string|element|function)',
				trigger: 'string',
				delay: '(number|object)',
				html: 'boolean',
				selector: '(string|boolean)',
				placement: '(string|function)',
				offset: '(number|string|function)',
				container: '(string|element|boolean)',
				fallbackPlacement: '(string|array)',
				boundary: '(string|element)',
				sanitize: 'boolean',
				sanitizeFn: '(null|function)',
				whiteList: 'object',
				popperConfig: '(null|object)',
			},
			Q = {
				AUTO: 'auto',
				TOP: 'top',
				RIGHT: 'right',
				BOTTOM: 'bottom',
				LEFT: 'left',
			},
			z = {
				animation: !0,
				template:
					'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
				trigger: 'hover focus',
				title: '',
				delay: 0,
				html: !1,
				selector: !1,
				placement: 'top',
				offset: 0,
				container: !1,
				fallbackPlacement: 'flip',
				boundary: 'scrollParent',
				sanitize: !0,
				sanitizeFn: null,
				whiteList: {
					'*': [
						'class',
						'dir',
						'id',
						'lang',
						'role',
						/^aria-[\w-]*$/i,
					],
					a: ['target', 'href', 'title', 'rel'],
					area: [],
					b: [],
					br: [],
					col: [],
					code: [],
					div: [],
					em: [],
					hr: [],
					h1: [],
					h2: [],
					h3: [],
					h4: [],
					h5: [],
					h6: [],
					i: [],
					img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
					li: [],
					ol: [],
					p: [],
					pre: [],
					s: [],
					small: [],
					span: [],
					sub: [],
					sup: [],
					strong: [],
					u: [],
					ul: [],
				},
				popperConfig: null,
			},
			V = {
				HIDE: 'hide.bs.tooltip',
				HIDDEN: 'hidden.bs.tooltip',
				SHOW: 'show.bs.tooltip',
				SHOWN: 'shown.bs.tooltip',
				INSERTED: 'inserted.bs.tooltip',
				CLICK: 'click.bs.tooltip',
				FOCUSIN: 'focusin.bs.tooltip',
				FOCUSOUT: 'focusout.bs.tooltip',
				MOUSEENTER: 'mouseenter.bs.tooltip',
				MOUSELEAVE: 'mouseleave.bs.tooltip',
			},
			X = (function () {
				function e(e, t) {
					if (void 0 === o.default)
						throw new TypeError(
							"Bootstrap's tooltips require Popper.js (https://popper.js.org/)"
						);
					(this._isEnabled = !0),
						(this._timeout = 0),
						(this._hoverState = ''),
						(this._activeTrigger = {}),
						(this._popper = null),
						(this.element = e),
						(this.config = this._getConfig(t)),
						(this.tip = null),
						this._setListeners();
				}
				var t = e.prototype;
				return (
					(t.enable = function () {
						this._isEnabled = !0;
					}),
					(t.disable = function () {
						this._isEnabled = !1;
					}),
					(t.toggleEnabled = function () {
						this._isEnabled = !this._isEnabled;
					}),
					(t.toggle = function (e) {
						if (this._isEnabled)
							if (e) {
								var t = this.constructor.DATA_KEY,
									n = r.default(e.currentTarget).data(t);
								n ||
									((n = new this.constructor(
										e.currentTarget,
										this._getDelegateConfig()
									)),
									r.default(e.currentTarget).data(t, n)),
									(n._activeTrigger.click = !n._activeTrigger
										.click),
									n._isWithActiveTrigger()
										? n._enter(null, n)
										: n._leave(null, n);
							} else {
								if (
									r
										.default(this.getTipElement())
										.hasClass('show')
								)
									return void this._leave(null, this);
								this._enter(null, this);
							}
					}),
					(t.dispose = function () {
						clearTimeout(this._timeout),
							r.default.removeData(
								this.element,
								this.constructor.DATA_KEY
							),
							r
								.default(this.element)
								.off(this.constructor.EVENT_KEY),
							r
								.default(this.element)
								.closest('.modal')
								.off('hide.bs.modal', this._hideModalHandler),
							this.tip && r.default(this.tip).remove(),
							(this._isEnabled = null),
							(this._timeout = null),
							(this._hoverState = null),
							(this._activeTrigger = null),
							this._popper && this._popper.destroy(),
							(this._popper = null),
							(this.element = null),
							(this.config = null),
							(this.tip = null);
					}),
					(t.show = function () {
						var e = this;
						if ('none' === r.default(this.element).css('display'))
							throw new Error(
								'Please use show on visible elements'
							);
						var t = r.default.Event(this.constructor.Event.SHOW);
						if (this.isWithContent() && this._isEnabled) {
							r.default(this.element).trigger(t);
							var n = u.findShadowRoot(this.element),
								i = r.default.contains(
									null !== n
										? n
										: this.element.ownerDocument
												.documentElement,
									this.element
								);
							if (t.isDefaultPrevented() || !i) return;
							var a = this.getTipElement(),
								s = u.getUID(this.constructor.NAME);
							a.setAttribute('id', s),
								this.element.setAttribute(
									'aria-describedby',
									s
								),
								this.setContent(),
								this.config.animation &&
									r.default(a).addClass('fade');
							var l =
									'function' == typeof this.config.placement
										? this.config.placement.call(
												this,
												a,
												this.element
										  )
										: this.config.placement,
								c = this._getAttachment(l);
							this.addAttachmentClass(c);
							var f = this._getContainer();
							r.default(a).data(this.constructor.DATA_KEY, this),
								r.default.contains(
									this.element.ownerDocument.documentElement,
									this.tip
								) || r.default(a).appendTo(f),
								r
									.default(this.element)
									.trigger(this.constructor.Event.INSERTED),
								(this._popper = new o.default(
									this.element,
									a,
									this._getPopperConfig(c)
								)),
								r.default(a).addClass('show'),
								'ontouchstart' in document.documentElement &&
									r
										.default(document.body)
										.children()
										.on('mouseover', null, r.default.noop);
							var d = function () {
								e.config.animation && e._fixTransition();
								var t = e._hoverState;
								(e._hoverState = null),
									r
										.default(e.element)
										.trigger(e.constructor.Event.SHOWN),
									'out' === t && e._leave(null, e);
							};
							if (r.default(this.tip).hasClass('fade')) {
								var h = u.getTransitionDurationFromElement(
									this.tip
								);
								r.default(this.tip)
									.one(u.TRANSITION_END, d)
									.emulateTransitionEnd(h);
							} else d();
						}
					}),
					(t.hide = function (e) {
						var t = this,
							n = this.getTipElement(),
							i = r.default.Event(this.constructor.Event.HIDE),
							o = function () {
								'show' !== t._hoverState &&
									n.parentNode &&
									n.parentNode.removeChild(n),
									t._cleanTipClass(),
									t.element.removeAttribute(
										'aria-describedby'
									),
									r
										.default(t.element)
										.trigger(t.constructor.Event.HIDDEN),
									null !== t._popper && t._popper.destroy(),
									e && e();
							};
						if (
							(r.default(this.element).trigger(i),
							!i.isDefaultPrevented())
						) {
							if (
								(r.default(n).removeClass('show'),
								'ontouchstart' in document.documentElement &&
									r
										.default(document.body)
										.children()
										.off('mouseover', null, r.default.noop),
								(this._activeTrigger.click = !1),
								(this._activeTrigger.focus = !1),
								(this._activeTrigger.hover = !1),
								r.default(this.tip).hasClass('fade'))
							) {
								var a = u.getTransitionDurationFromElement(n);
								r.default(n)
									.one(u.TRANSITION_END, o)
									.emulateTransitionEnd(a);
							} else o();
							this._hoverState = '';
						}
					}),
					(t.update = function () {
						null !== this._popper && this._popper.scheduleUpdate();
					}),
					(t.isWithContent = function () {
						return Boolean(this.getTitle());
					}),
					(t.addAttachmentClass = function (e) {
						r.default(this.getTipElement()).addClass(
							'bs-tooltip-' + e
						);
					}),
					(t.getTipElement = function () {
						return (
							(this.tip =
								this.tip || r.default(this.config.template)[0]),
							this.tip
						);
					}),
					(t.setContent = function () {
						var e = this.getTipElement();
						this.setElementContent(
							r.default(e.querySelectorAll('.tooltip-inner')),
							this.getTitle()
						),
							r.default(e).removeClass('fade show');
					}),
					(t.setElementContent = function (e, t) {
						'object' != typeof t || (!t.nodeType && !t.jquery)
							? this.config.html
								? (this.config.sanitize &&
										(t = F(
											t,
											this.config.whiteList,
											this.config.sanitizeFn
										)),
								  e.html(t))
								: e.text(t)
							: this.config.html
							? r.default(t).parent().is(e) || e.empty().append(t)
							: e.text(r.default(t).text());
					}),
					(t.getTitle = function () {
						var e = this.element.getAttribute(
							'data-original-title'
						);
						return (
							e ||
								(e =
									'function' == typeof this.config.title
										? this.config.title.call(this.element)
										: this.config.title),
							e
						);
					}),
					(t._getPopperConfig = function (e) {
						var t = this;
						return l(
							{},
							{
								placement: e,
								modifiers: {
									offset: this._getOffset(),
									flip: {
										behavior: this.config.fallbackPlacement,
									},
									arrow: { element: '.arrow' },
									preventOverflow: {
										boundariesElement: this.config.boundary,
									},
								},
								onCreate: function (e) {
									e.originalPlacement !== e.placement &&
										t._handlePopperPlacementChange(e);
								},
								onUpdate: function (e) {
									return t._handlePopperPlacementChange(e);
								},
							},
							this.config.popperConfig
						);
					}),
					(t._getOffset = function () {
						var e = this,
							t = {};
						return (
							'function' == typeof this.config.offset
								? (t.fn = function (t) {
										return (
											(t.offsets = l(
												{},
												t.offsets,
												e.config.offset(
													t.offsets,
													e.element
												) || {}
											)),
											t
										);
								  })
								: (t.offset = this.config.offset),
							t
						);
					}),
					(t._getContainer = function () {
						return !1 === this.config.container
							? document.body
							: u.isElement(this.config.container)
							? r.default(this.config.container)
							: r.default(document).find(this.config.container);
					}),
					(t._getAttachment = function (e) {
						return Q[e.toUpperCase()];
					}),
					(t._setListeners = function () {
						var e = this;
						this.config.trigger.split(' ').forEach(function (t) {
							if ('click' === t)
								r.default(e.element).on(
									e.constructor.Event.CLICK,
									e.config.selector,
									function (t) {
										return e.toggle(t);
									}
								);
							else if ('manual' !== t) {
								var n =
										'hover' === t
											? e.constructor.Event.MOUSEENTER
											: e.constructor.Event.FOCUSIN,
									i =
										'hover' === t
											? e.constructor.Event.MOUSELEAVE
											: e.constructor.Event.FOCUSOUT;
								r.default(e.element)
									.on(n, e.config.selector, function (t) {
										return e._enter(t);
									})
									.on(i, e.config.selector, function (t) {
										return e._leave(t);
									});
							}
						}),
							(this._hideModalHandler = function () {
								e.element && e.hide();
							}),
							r
								.default(this.element)
								.closest('.modal')
								.on('hide.bs.modal', this._hideModalHandler),
							this.config.selector
								? (this.config = l({}, this.config, {
										trigger: 'manual',
										selector: '',
								  }))
								: this._fixTitle();
					}),
					(t._fixTitle = function () {
						var e = typeof this.element.getAttribute(
							'data-original-title'
						);
						(this.element.getAttribute('title') ||
							'string' !== e) &&
							(this.element.setAttribute(
								'data-original-title',
								this.element.getAttribute('title') || ''
							),
							this.element.setAttribute('title', ''));
					}),
					(t._enter = function (e, t) {
						var n = this.constructor.DATA_KEY;
						(t = t || r.default(e.currentTarget).data(n)) ||
							((t = new this.constructor(
								e.currentTarget,
								this._getDelegateConfig()
							)),
							r.default(e.currentTarget).data(n, t)),
							e &&
								(t._activeTrigger[
									'focusin' === e.type ? 'focus' : 'hover'
								] = !0),
							r.default(t.getTipElement()).hasClass('show') ||
							'show' === t._hoverState
								? (t._hoverState = 'show')
								: (clearTimeout(t._timeout),
								  (t._hoverState = 'show'),
								  t.config.delay && t.config.delay.show
										? (t._timeout = setTimeout(function () {
												'show' === t._hoverState &&
													t.show();
										  }, t.config.delay.show))
										: t.show());
					}),
					(t._leave = function (e, t) {
						var n = this.constructor.DATA_KEY;
						(t = t || r.default(e.currentTarget).data(n)) ||
							((t = new this.constructor(
								e.currentTarget,
								this._getDelegateConfig()
							)),
							r.default(e.currentTarget).data(n, t)),
							e &&
								(t._activeTrigger[
									'focusout' === e.type ? 'focus' : 'hover'
								] = !1),
							t._isWithActiveTrigger() ||
								(clearTimeout(t._timeout),
								(t._hoverState = 'out'),
								t.config.delay && t.config.delay.hide
									? (t._timeout = setTimeout(function () {
											'out' === t._hoverState && t.hide();
									  }, t.config.delay.hide))
									: t.hide());
					}),
					(t._isWithActiveTrigger = function () {
						for (var e in this._activeTrigger)
							if (this._activeTrigger[e]) return !0;
						return !1;
					}),
					(t._getConfig = function (e) {
						var t = r.default(this.element).data();
						return (
							Object.keys(t).forEach(function (e) {
								-1 !== W.indexOf(e) && delete t[e];
							}),
							'number' ==
								typeof (e = l(
									{},
									this.constructor.Default,
									t,
									'object' == typeof e && e ? e : {}
								)).delay &&
								(e.delay = { show: e.delay, hide: e.delay }),
							'number' == typeof e.title &&
								(e.title = e.title.toString()),
							'number' == typeof e.content &&
								(e.content = e.content.toString()),
							u.typeCheckConfig(
								M,
								e,
								this.constructor.DefaultType
							),
							e.sanitize &&
								(e.template = F(
									e.template,
									e.whiteList,
									e.sanitizeFn
								)),
							e
						);
					}),
					(t._getDelegateConfig = function () {
						var e = {};
						if (this.config)
							for (var t in this.config)
								this.constructor.Default[t] !==
									this.config[t] && (e[t] = this.config[t]);
						return e;
					}),
					(t._cleanTipClass = function () {
						var e = r.default(this.getTipElement()),
							t = e.attr('class').match(B);
						null !== t && t.length && e.removeClass(t.join(''));
					}),
					(t._handlePopperPlacementChange = function (e) {
						(this.tip = e.instance.popper),
							this._cleanTipClass(),
							this.addAttachmentClass(
								this._getAttachment(e.placement)
							);
					}),
					(t._fixTransition = function () {
						var e = this.getTipElement(),
							t = this.config.animation;
						null === e.getAttribute('x-placement') &&
							(r.default(e).removeClass('fade'),
							(this.config.animation = !1),
							this.hide(),
							this.show(),
							(this.config.animation = t));
					}),
					(e._jQueryInterface = function (t) {
						return this.each(function () {
							var n = r.default(this),
								i = n.data('bs.tooltip'),
								o = 'object' == typeof t && t;
							if (
								(i || !/dispose|hide/.test(t)) &&
								(i ||
									((i = new e(this, o)),
									n.data('bs.tooltip', i)),
								'string' == typeof t)
							) {
								if (void 0 === i[t])
									throw new TypeError(
										'No method named "' + t + '"'
									);
								i[t]();
							}
						});
					}),
					s(e, null, [
						{
							key: 'VERSION',
							get: function () {
								return '4.5.3';
							},
						},
						{
							key: 'Default',
							get: function () {
								return z;
							},
						},
						{
							key: 'NAME',
							get: function () {
								return M;
							},
						},
						{
							key: 'DATA_KEY',
							get: function () {
								return 'bs.tooltip';
							},
						},
						{
							key: 'Event',
							get: function () {
								return V;
							},
						},
						{
							key: 'EVENT_KEY',
							get: function () {
								return '.bs.tooltip';
							},
						},
						{
							key: 'DefaultType',
							get: function () {
								return U;
							},
						},
					]),
					e
				);
			})();
		(r.default.fn[M] = X._jQueryInterface),
			(r.default.fn[M].Constructor = X),
			(r.default.fn[M].noConflict = function () {
				return (r.default.fn[M] = $), X._jQueryInterface;
			});
		var Y = 'popover',
			K = r.default.fn[Y],
			G = new RegExp('(^|\\s)bs-popover\\S+', 'g'),
			J = l({}, X.Default, {
				placement: 'right',
				trigger: 'click',
				content: '',
				template:
					'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
			}),
			Z = l({}, X.DefaultType, { content: '(string|element|function)' }),
			ee = {
				HIDE: 'hide.bs.popover',
				HIDDEN: 'hidden.bs.popover',
				SHOW: 'show.bs.popover',
				SHOWN: 'shown.bs.popover',
				INSERTED: 'inserted.bs.popover',
				CLICK: 'click.bs.popover',
				FOCUSIN: 'focusin.bs.popover',
				FOCUSOUT: 'focusout.bs.popover',
				MOUSEENTER: 'mouseenter.bs.popover',
				MOUSELEAVE: 'mouseleave.bs.popover',
			},
			te = (function (e) {
				var t, n;
				function i() {
					return e.apply(this, arguments) || this;
				}
				(n = e),
					((t = i).prototype = Object.create(n.prototype)),
					(t.prototype.constructor = t),
					(t.__proto__ = n);
				var o = i.prototype;
				return (
					(o.isWithContent = function () {
						return this.getTitle() || this._getContent();
					}),
					(o.addAttachmentClass = function (e) {
						r.default(this.getTipElement()).addClass(
							'bs-popover-' + e
						);
					}),
					(o.getTipElement = function () {
						return (
							(this.tip =
								this.tip || r.default(this.config.template)[0]),
							this.tip
						);
					}),
					(o.setContent = function () {
						var e = r.default(this.getTipElement());
						this.setElementContent(
							e.find('.popover-header'),
							this.getTitle()
						);
						var t = this._getContent();
						'function' == typeof t && (t = t.call(this.element)),
							this.setElementContent(e.find('.popover-body'), t),
							e.removeClass('fade show');
					}),
					(o._getContent = function () {
						return (
							this.element.getAttribute('data-content') ||
							this.config.content
						);
					}),
					(o._cleanTipClass = function () {
						var e = r.default(this.getTipElement()),
							t = e.attr('class').match(G);
						null !== t && t.length > 0 && e.removeClass(t.join(''));
					}),
					(i._jQueryInterface = function (e) {
						return this.each(function () {
							var t = r.default(this).data('bs.popover'),
								n = 'object' == typeof e ? e : null;
							if (
								(t || !/dispose|hide/.test(e)) &&
								(t ||
									((t = new i(this, n)),
									r.default(this).data('bs.popover', t)),
								'string' == typeof e)
							) {
								if (void 0 === t[e])
									throw new TypeError(
										'No method named "' + e + '"'
									);
								t[e]();
							}
						});
					}),
					s(i, null, [
						{
							key: 'VERSION',
							get: function () {
								return '4.5.3';
							},
						},
						{
							key: 'Default',
							get: function () {
								return J;
							},
						},
						{
							key: 'NAME',
							get: function () {
								return Y;
							},
						},
						{
							key: 'DATA_KEY',
							get: function () {
								return 'bs.popover';
							},
						},
						{
							key: 'Event',
							get: function () {
								return ee;
							},
						},
						{
							key: 'EVENT_KEY',
							get: function () {
								return '.bs.popover';
							},
						},
						{
							key: 'DefaultType',
							get: function () {
								return Z;
							},
						},
					]),
					i
				);
			})(X);
		(r.default.fn[Y] = te._jQueryInterface),
			(r.default.fn[Y].Constructor = te),
			(r.default.fn[Y].noConflict = function () {
				return (r.default.fn[Y] = K), te._jQueryInterface;
			});
		var ne = 'scrollspy',
			ie = r.default.fn[ne],
			re = { offset: 10, method: 'auto', target: '' },
			oe = {
				offset: 'number',
				method: 'string',
				target: '(string|element)',
			},
			ae = (function () {
				function e(e, t) {
					var n = this;
					(this._element = e),
						(this._scrollElement =
							'BODY' === e.tagName ? window : e),
						(this._config = this._getConfig(t)),
						(this._selector =
							this._config.target +
							' .nav-link,' +
							this._config.target +
							' .list-group-item,' +
							this._config.target +
							' .dropdown-item'),
						(this._offsets = []),
						(this._targets = []),
						(this._activeTarget = null),
						(this._scrollHeight = 0),
						r
							.default(this._scrollElement)
							.on('scroll.bs.scrollspy', function (e) {
								return n._process(e);
							}),
						this.refresh(),
						this._process();
				}
				var t = e.prototype;
				return (
					(t.refresh = function () {
						var e = this,
							t =
								'auto' === this._config.method
									? this._scrollElement ===
									  this._scrollElement.window
										? 'offset'
										: 'position'
									: this._config.method,
							n = 'position' === t ? this._getScrollTop() : 0;
						(this._offsets = []),
							(this._targets = []),
							(this._scrollHeight = this._getScrollHeight()),
							[].slice
								.call(document.querySelectorAll(this._selector))
								.map(function (e) {
									var i,
										o = u.getSelectorFromElement(e);
									if (
										(o && (i = document.querySelector(o)),
										i)
									) {
										var a = i.getBoundingClientRect();
										if (a.width || a.height)
											return [
												r.default(i)[t]().top + n,
												o,
											];
									}
									return null;
								})
								.filter(function (e) {
									return e;
								})
								.sort(function (e, t) {
									return e[0] - t[0];
								})
								.forEach(function (t) {
									e._offsets.push(t[0]),
										e._targets.push(t[1]);
								});
					}),
					(t.dispose = function () {
						r.default.removeData(this._element, 'bs.scrollspy'),
							r.default(this._scrollElement).off('.bs.scrollspy'),
							(this._element = null),
							(this._scrollElement = null),
							(this._config = null),
							(this._selector = null),
							(this._offsets = null),
							(this._targets = null),
							(this._activeTarget = null),
							(this._scrollHeight = null);
					}),
					(t._getConfig = function (e) {
						if (
							'string' !=
								typeof (e = l(
									{},
									re,
									'object' == typeof e && e ? e : {}
								)).target &&
							u.isElement(e.target)
						) {
							var t = r.default(e.target).attr('id');
							t ||
								((t = u.getUID(ne)),
								r.default(e.target).attr('id', t)),
								(e.target = '#' + t);
						}
						return u.typeCheckConfig(ne, e, oe), e;
					}),
					(t._getScrollTop = function () {
						return this._scrollElement === window
							? this._scrollElement.pageYOffset
							: this._scrollElement.scrollTop;
					}),
					(t._getScrollHeight = function () {
						return (
							this._scrollElement.scrollHeight ||
							Math.max(
								document.body.scrollHeight,
								document.documentElement.scrollHeight
							)
						);
					}),
					(t._getOffsetHeight = function () {
						return this._scrollElement === window
							? window.innerHeight
							: this._scrollElement.getBoundingClientRect()
									.height;
					}),
					(t._process = function () {
						var e = this._getScrollTop() + this._config.offset,
							t = this._getScrollHeight(),
							n =
								this._config.offset +
								t -
								this._getOffsetHeight();
						if (
							(this._scrollHeight !== t && this.refresh(), e >= n)
						) {
							var i = this._targets[this._targets.length - 1];
							this._activeTarget !== i && this._activate(i);
						} else {
							if (
								this._activeTarget &&
								e < this._offsets[0] &&
								this._offsets[0] > 0
							)
								return (
									(this._activeTarget = null),
									void this._clear()
								);
							for (var r = this._offsets.length; r--; )
								this._activeTarget !== this._targets[r] &&
									e >= this._offsets[r] &&
									(void 0 === this._offsets[r + 1] ||
										e < this._offsets[r + 1]) &&
									this._activate(this._targets[r]);
						}
					}),
					(t._activate = function (e) {
						(this._activeTarget = e), this._clear();
						var t = this._selector.split(',').map(function (t) {
								return (
									t +
									'[data-target="' +
									e +
									'"],' +
									t +
									'[href="' +
									e +
									'"]'
								);
							}),
							n = r.default(
								[].slice.call(
									document.querySelectorAll(t.join(','))
								)
							);
						n.hasClass('dropdown-item')
							? (n
									.closest('.dropdown')
									.find('.dropdown-toggle')
									.addClass('active'),
							  n.addClass('active'))
							: (n.addClass('active'),
							  n
									.parents('.nav, .list-group')
									.prev('.nav-link, .list-group-item')
									.addClass('active'),
							  n
									.parents('.nav, .list-group')
									.prev('.nav-item')
									.children('.nav-link')
									.addClass('active')),
							r
								.default(this._scrollElement)
								.trigger('activate.bs.scrollspy', {
									relatedTarget: e,
								});
					}),
					(t._clear = function () {
						[].slice
							.call(document.querySelectorAll(this._selector))
							.filter(function (e) {
								return e.classList.contains('active');
							})
							.forEach(function (e) {
								return e.classList.remove('active');
							});
					}),
					(e._jQueryInterface = function (t) {
						return this.each(function () {
							var n = r.default(this).data('bs.scrollspy');
							if (
								(n ||
									((n = new e(
										this,
										'object' == typeof t && t
									)),
									r.default(this).data('bs.scrollspy', n)),
								'string' == typeof t)
							) {
								if (void 0 === n[t])
									throw new TypeError(
										'No method named "' + t + '"'
									);
								n[t]();
							}
						});
					}),
					s(e, null, [
						{
							key: 'VERSION',
							get: function () {
								return '4.5.3';
							},
						},
						{
							key: 'Default',
							get: function () {
								return re;
							},
						},
					]),
					e
				);
			})();
		r.default(window).on('load.bs.scrollspy.data-api', function () {
			for (
				var e = [].slice.call(
						document.querySelectorAll('[data-spy="scroll"]')
					),
					t = e.length;
				t--;

			) {
				var n = r.default(e[t]);
				ae._jQueryInterface.call(n, n.data());
			}
		}),
			(r.default.fn[ne] = ae._jQueryInterface),
			(r.default.fn[ne].Constructor = ae),
			(r.default.fn[ne].noConflict = function () {
				return (r.default.fn[ne] = ie), ae._jQueryInterface;
			});
		var se = r.default.fn.tab,
			le = (function () {
				function e(e) {
					this._element = e;
				}
				var t = e.prototype;
				return (
					(t.show = function () {
						var e = this;
						if (
							!(
								(this._element.parentNode &&
									this._element.parentNode.nodeType ===
										Node.ELEMENT_NODE &&
									r
										.default(this._element)
										.hasClass('active')) ||
								r.default(this._element).hasClass('disabled')
							)
						) {
							var t,
								n,
								i = r
									.default(this._element)
									.closest('.nav, .list-group')[0],
								o = u.getSelectorFromElement(this._element);
							if (i) {
								var a =
									'UL' === i.nodeName || 'OL' === i.nodeName
										? '> li > .active'
										: '.active';
								n = (n = r.default.makeArray(
									r.default(i).find(a)
								))[n.length - 1];
							}
							var s = r.default.Event('hide.bs.tab', {
									relatedTarget: this._element,
								}),
								l = r.default.Event('show.bs.tab', {
									relatedTarget: n,
								});
							if (
								(n && r.default(n).trigger(s),
								r.default(this._element).trigger(l),
								!l.isDefaultPrevented() &&
									!s.isDefaultPrevented())
							) {
								o && (t = document.querySelector(o)),
									this._activate(this._element, i);
								var c = function () {
									var t = r.default.Event('hidden.bs.tab', {
											relatedTarget: e._element,
										}),
										i = r.default.Event('shown.bs.tab', {
											relatedTarget: n,
										});
									r.default(n).trigger(t),
										r.default(e._element).trigger(i);
								};
								t ? this._activate(t, t.parentNode, c) : c();
							}
						}
					}),
					(t.dispose = function () {
						r.default.removeData(this._element, 'bs.tab'),
							(this._element = null);
					}),
					(t._activate = function (e, t, n) {
						var i = this,
							o = (!t ||
							('UL' !== t.nodeName && 'OL' !== t.nodeName)
								? r.default(t).children('.active')
								: r.default(t).find('> li > .active'))[0],
							a = n && o && r.default(o).hasClass('fade'),
							s = function () {
								return i._transitionComplete(e, o, n);
							};
						if (o && a) {
							var l = u.getTransitionDurationFromElement(o);
							r.default(o)
								.removeClass('show')
								.one(u.TRANSITION_END, s)
								.emulateTransitionEnd(l);
						} else s();
					}),
					(t._transitionComplete = function (e, t, n) {
						if (t) {
							r.default(t).removeClass('active');
							var i = r
								.default(t.parentNode)
								.find('> .dropdown-menu .active')[0];
							i && r.default(i).removeClass('active'),
								'tab' === t.getAttribute('role') &&
									t.setAttribute('aria-selected', !1);
						}
						if (
							(r.default(e).addClass('active'),
							'tab' === e.getAttribute('role') &&
								e.setAttribute('aria-selected', !0),
							u.reflow(e),
							e.classList.contains('fade') &&
								e.classList.add('show'),
							e.parentNode &&
								r
									.default(e.parentNode)
									.hasClass('dropdown-menu'))
						) {
							var o = r.default(e).closest('.dropdown')[0];
							if (o) {
								var a = [].slice.call(
									o.querySelectorAll('.dropdown-toggle')
								);
								r.default(a).addClass('active');
							}
							e.setAttribute('aria-expanded', !0);
						}
						n && n();
					}),
					(e._jQueryInterface = function (t) {
						return this.each(function () {
							var n = r.default(this),
								i = n.data('bs.tab');
							if (
								(i || ((i = new e(this)), n.data('bs.tab', i)),
								'string' == typeof t)
							) {
								if (void 0 === i[t])
									throw new TypeError(
										'No method named "' + t + '"'
									);
								i[t]();
							}
						});
					}),
					s(e, null, [
						{
							key: 'VERSION',
							get: function () {
								return '4.5.3';
							},
						},
					]),
					e
				);
			})();
		r
			.default(document)
			.on(
				'click.bs.tab.data-api',
				'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
				function (e) {
					e.preventDefault(),
						le._jQueryInterface.call(r.default(this), 'show');
				}
			),
			(r.default.fn.tab = le._jQueryInterface),
			(r.default.fn.tab.Constructor = le),
			(r.default.fn.tab.noConflict = function () {
				return (r.default.fn.tab = se), le._jQueryInterface;
			});
		var ue = r.default.fn.toast,
			ce = { animation: 'boolean', autohide: 'boolean', delay: 'number' },
			fe = { animation: !0, autohide: !0, delay: 500 },
			de = (function () {
				function e(e, t) {
					(this._element = e),
						(this._config = this._getConfig(t)),
						(this._timeout = null),
						this._setListeners();
				}
				var t = e.prototype;
				return (
					(t.show = function () {
						var e = this,
							t = r.default.Event('show.bs.toast');
						if (
							(r.default(this._element).trigger(t),
							!t.isDefaultPrevented())
						) {
							this._clearTimeout(),
								this._config.animation &&
									this._element.classList.add('fade');
							var n = function () {
								e._element.classList.remove('showing'),
									e._element.classList.add('show'),
									r
										.default(e._element)
										.trigger('shown.bs.toast'),
									e._config.autohide &&
										(e._timeout = setTimeout(function () {
											e.hide();
										}, e._config.delay));
							};
							if (
								(this._element.classList.remove('hide'),
								u.reflow(this._element),
								this._element.classList.add('showing'),
								this._config.animation)
							) {
								var i = u.getTransitionDurationFromElement(
									this._element
								);
								r.default(this._element)
									.one(u.TRANSITION_END, n)
									.emulateTransitionEnd(i);
							} else n();
						}
					}),
					(t.hide = function () {
						if (this._element.classList.contains('show')) {
							var e = r.default.Event('hide.bs.toast');
							r.default(this._element).trigger(e),
								e.isDefaultPrevented() || this._close();
						}
					}),
					(t.dispose = function () {
						this._clearTimeout(),
							this._element.classList.contains('show') &&
								this._element.classList.remove('show'),
							r
								.default(this._element)
								.off('click.dismiss.bs.toast'),
							r.default.removeData(this._element, 'bs.toast'),
							(this._element = null),
							(this._config = null);
					}),
					(t._getConfig = function (e) {
						return (
							(e = l(
								{},
								fe,
								r.default(this._element).data(),
								'object' == typeof e && e ? e : {}
							)),
							u.typeCheckConfig(
								'toast',
								e,
								this.constructor.DefaultType
							),
							e
						);
					}),
					(t._setListeners = function () {
						var e = this;
						r.default(this._element).on(
							'click.dismiss.bs.toast',
							'[data-dismiss="toast"]',
							function () {
								return e.hide();
							}
						);
					}),
					(t._close = function () {
						var e = this,
							t = function () {
								e._element.classList.add('hide'),
									r
										.default(e._element)
										.trigger('hidden.bs.toast');
							};
						if (
							(this._element.classList.remove('show'),
							this._config.animation)
						) {
							var n = u.getTransitionDurationFromElement(
								this._element
							);
							r.default(this._element)
								.one(u.TRANSITION_END, t)
								.emulateTransitionEnd(n);
						} else t();
					}),
					(t._clearTimeout = function () {
						clearTimeout(this._timeout), (this._timeout = null);
					}),
					(e._jQueryInterface = function (t) {
						return this.each(function () {
							var n = r.default(this),
								i = n.data('bs.toast');
							if (
								(i ||
									((i = new e(
										this,
										'object' == typeof t && t
									)),
									n.data('bs.toast', i)),
								'string' == typeof t)
							) {
								if (void 0 === i[t])
									throw new TypeError(
										'No method named "' + t + '"'
									);
								i[t](this);
							}
						});
					}),
					s(e, null, [
						{
							key: 'VERSION',
							get: function () {
								return '4.5.3';
							},
						},
						{
							key: 'DefaultType',
							get: function () {
								return ce;
							},
						},
						{
							key: 'Default',
							get: function () {
								return fe;
							},
						},
					]),
					e
				);
			})();
		(r.default.fn.toast = de._jQueryInterface),
			(r.default.fn.toast.Constructor = de),
			(r.default.fn.toast.noConflict = function () {
				return (r.default.fn.toast = ue), de._jQueryInterface;
			}),
			(e.Alert = d),
			(e.Button = p),
			(e.Carousel = _),
			(e.Collapse = C),
			(e.Dropdown = j),
			(e.Modal = L),
			(e.Popover = te),
			(e.Scrollspy = ae),
			(e.Tab = le),
			(e.Toast = de),
			(e.Tooltip = X),
			(e.Util = u),
			Object.defineProperty(e, '__esModule', { value: !0 });
	}),
	$(document).ready(function () {
		let e = [],
			t = 'fr';
		$('link[rel="stylesheet"]').each(function () {
			let e = $(this).attr('href');
			'translation/stati18n.css' !== e &&
				e.indexOf('stati18n') > -1 &&
				(t = e.slice(9, -4));
		});
		var n = t;
		let i;
		$('.stati18n-language-selector').each(function () {
			e.push(this.getAttribute('value'));
		}),
			$('body').append(
				'<div id="stati18n-infos" style="display:none;"></div>'
			),
			(i = isIE()
				? window.getComputedStyle(
						document.getElementById('stati18n-infos')
				  ).customContent
				: $('#stati18n-infos').css('content')),
			(i = i.slice(1, i.length - 1));
		let r = i.split(' '),
			o = r[0],
			a = r.slice(1, r.length);
		$('#stati18n-infos').remove(),
			$('body').append(
				'<div id="stati18n-fixed-values" style="display:none;"></div>'
			),
			(i = isIE()
				? window.getComputedStyle(
						document.getElementById('stati18n-fixed-values')
				  ).customContent
				: $('#stati18n-fixed-values').css('content')),
			(i = i.slice(1, i.length - 1));
		let s = i.split(';;');
		$('#stati18n-fixed-values').remove();
		let l = e.indexOf(n);
		n = l > -1 ? e[l] : e[0];
		let u = getCookie('lang');
		function c(e) {
			let t = o + '/translation/stati18n-' + n + '.css',
				i = o + '/translation/stati18n-' + (n = e) + '.css';
			!$("link[href='" + i + "']").length &&
				$.inArray(n, a) >= 0 &&
				($("link[href='" + t + "']").remove(),
				$('head').append(
					'<link rel="stylesheet" href="' + i + '" type="text/css" />'
				)),
				createCookie('lang', n, 7),
				$('.stati18n-language-selector').attr('value', n),
				'fr' === $('.stati18n-language-selector').attr('value')
					? ($('.stati18n-language-selector').attr('value', 'en'),
					  $('.stati18n-language-selector')
							.find('.flag-icon')
							.removeClass('flag-icon-fr'),
					  $('.stati18n-language-selector')
							.find('.flag-icon')
							.addClass('flag-icon-gb'),
					  $('.stati18n.s18n-see-more').attr(
							'onclick',
							"window.open('https://cvdesignr.com/p/5d9cd3013bcbb', '_blank')"
					  ),
					  f(n))
					: ($('.stati18n-language-selector').attr('value', 'fr'),
					  $('.stati18n-language-selector')
							.find('.flag-icon')
							.removeClass('flag-icon-gb'),
					  $('.stati18n-language-selector')
							.find('.flag-icon')
							.addClass('flag-icon-fr'),
					  $('.stati18n.s18n-see-more').attr(
							'onclick',
							"window.open('https://cvdesignr.com/p/5ddff0dda9765', '_blank')"
					  ),
					  f(n)),
				(function () {
					for (let e in s) {
						let t = s[e].split('\xa7\xa7');
						if (t[0] === n) {
							let e = t[1],
								n = t[2];
							void 0 !== $('.s18n-' + e).attr('value')
								? $('.s18n-' + e).attr('value', n)
								: $('.s18n-' + e).html(n);
						}
					}
				})();
		}
		function f(e) {
			'fr' === e
				? ($('#name').attr('placeholder', 'Votre nom *'),
				  $('#name').attr(
						'data-validation-required-message',
						'Veuillez saisir votre nom'
				  ),
				  $('#email').attr('placeholder', 'Votre adresse mail *'),
				  $('#email').attr(
						'data-validation-required-message',
						'Veuillez saisir votre adresse mail'
				  ),
				  $('#company').attr('placeholder', 'Nom de votre entreprise'),
				  $('#message').attr('placeholder', 'Votre message *'),
				  $('#message').attr(
						'data-validation-required-message',
						'Veuillez saisir votre message'
				  ))
				: ($('#name').attr('placeholder', 'Your last name *'),
				  $('#name').attr(
						'data-validation-required-message',
						'Please fill in your last name'
				  ),
				  $('#email').attr('placeholder', 'Your email address *'),
				  $('#email').attr(
						'data-validation-required-message',
						'Please fill in your email address'
				  ),
				  $('#company').attr('placeholder', "Company's name"),
				  $('#message').attr('placeholder', 'Your message *'),
				  $('#message').attr(
						'data-validation-required-message',
						'Please fill in your message'
				  ));
		}
		void 0 === u && (u = navigator.language.includes('fr') ? 'fr' : 'en'),
			c(u),
			$('.stati18n-language-selector').click(function (e) {
				c(this.getAttribute('value'));
			});
	});
