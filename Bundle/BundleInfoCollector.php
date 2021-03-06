<?php
namespace Arnm\CoreBundle\Bundle;

/**
 * This is an omplementation fo Bundle info collector interface
 * This is the one that used as a service
 *
 * @author Alex Agulyansky <alex@iibspro.com>
 */
class BundleInfoCollector implements BundleInfoCollectorInterface
{
    /**
     * Array of Bundle info pbjects of registered bundles
     *
     * @var array
     */
    private $bundles = array();

    /**
     * {@inheritdoc}
     * @see Arnm\CoreBundle\Bundle.BundleInfoCollectorInterface::register()
     */
    public function register(BundleInfoInterface $bundleInfo)
    {
        $this->addBundleInfo($bundleInfo);

        return $this;
    }

    /**
     * Adds bundle info object into the list
     *
     * @param BundleInfoInterface $bundleInfo
     *
     * @return $this
     */
    public function addBundleInfo(BundleInfoInterface $bundleInfo)
    {
        $this->bundles[] = $bundleInfo;

        return $this;
    }

    /**
     * Gets the entire list of all registered budle info objects
     *
     * @return array
     */
    public function getBundleInfos()
    {
        return $this->bundles;
    }
}
