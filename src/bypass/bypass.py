from hcapbypass import bypass
import sys

captcha_solved = bypass('antecedentes.policia.gov.co', '6LcsIwQaAAAAAFCsaI-dkR6hgKsZwwJRsmE0tIJH', sys.argv[1], True)
print(captcha_solved)