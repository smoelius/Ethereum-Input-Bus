#======================================================================================================#
# Makefile for EIB examples
#======================================================================================================#

SUBDIRS := $(filter-out Makefile README.md, $(wildcard *))

.PHONY: all pre_tsc post_tsc check test clobber clean

#======================================================================================================#

all: pre_tsc post_tsc

pre_tsc post_tsc check test clobber clean:
	for SUBDIR in $(SUBDIRS); do $(MAKE) -C $$SUBDIR $@; done

#======================================================================================================#
