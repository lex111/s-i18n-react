t.t("Extract me");

t.t("I'm using a named {placeholder}", {
    placeholder: "pl4c3h0ld3r"
});

t.t("I'm using two numerical {0} {1}", ["l33t", "pl4c3h0ld3rz"]);

t.t("I'm using a {0} numerical placeholder", 'single');

t.t("hello {user}", {
    user: "Mehdi"
});