<template>
    <footer>
        <div class="container">
            <hr>
            <div class="columns">
                <div class="left-footer has-text-left column is-6">
                    &copy; Gitrekt, Inc.
                </div>

                <div class="right-footer has-text-right column is-6">
                    <a href="https://github.com/SEGUC17/git-rekt-se" class="footer-link">github &nbsp;</a>
                    <a href="https://www.facebook.com/Git-Rekt-233623487117867/" class="footer-link">facebook &nbsp;</a>
                    <a href="https://twitter.com/gitrektse" class="footer-link">twitter &nbsp;</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
  /**
   * This component is represent the footer.
   */
  export default {};
</script>

<style>
    footer {
        color: #767676;
        margin-top: 1em;
        margin-bottom: 1em;
        padding-bottom: 1em;

    }

    .footer-link {
        color: #767676;
        font-size: 0.8em;
    }

    .footer-link:hover {
        color: #333333;
    }

    @media screen and (max-width: 999px){
        .left-footer,
        .right-footer {
            padding: 0;
            text-align: center;
        }
    }

</style>
